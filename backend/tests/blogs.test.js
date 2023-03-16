const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const jwt = require('jsonwebtoken')


const api = supertest(app)



let token, userId

beforeAll(async () => {
  const userInfo = {
    username: 'Mostapha',
    name: 'Mustapha Bouh',
    password: '123456'
  }
  // delete users
  await User.deleteMany({})

  // create new user
  await api.post('/api/users')
    .send({
      'username': userInfo.username,
      'name': userInfo.name,
      'password': userInfo.password
    })

  const LoginRes = await api.post('/api/login')
    .send({
      'username': userInfo.username,
      'password': userInfo.password
    })


  // save token
  token = LoginRes.body.token

  // save user
  const decodedToken = jwt.verify(token, process.env.SECRET)
  userId = decodedToken.id.toString()
})

describe('when we get blogs from backend', () => {
  beforeAll(async () => {
    await Blog.deleteMany({})

    const blogObject = helper.initialBlogs
      .map(blog => new Blog({
        ...blog,
        user: userId
      }))
    const promiseArray = blogObject.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('the correct amount of blogs is returned as JSON', async () => {
    const response = await api.get('/api/blogs')
    expect(response.type).toMatch(/application\/json/)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the blogs have a unique identifier property named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('adding a new blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
  })

  test('succeeds with valid data', async () => {
    await api.post('/api/blogs')
      .send(helper.blogToBeAdded)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)

    const savedBlogs = await helper.blogsInDb()

    expect(savedBlogs).toHaveLength(1)
    expect(savedBlogs.at(-1)).toMatchObject(helper.blogToBeAdded)
  })

  test('fails if token is not provided', async () => {
    await api.post('/api/blogs')
      .send(helper.blogToBeAdded)
      .expect(401)
  })

  test('defaults the value of likes property to zero when it\'s missing', async () => {
    const response = await api.post('/api/blogs')
      .send(helper.blogWithoutLikesProp)
      .set('Authorization', `Bearer ${token}`)

    expect(response.body).toMatchObject({
      likes: 0
    })
  })

  test('responds with 400 status code if the title or url properties are missing', async () => {
    await api.post('/api/blogs')
      .send(helper.blogWithoutTitle)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    await api.post('/api/blogs')
      .send(helper.blogWithoutUrl)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
  })
})

describe('when we manage the backend', () => {
  beforeAll(async () => {
    await Blog.deleteMany({})

    const blogObject = helper.initialBlogs
      .map(blog => new Blog({
        ...blog,
        user: userId
      }))
    const promiseArray = blogObject.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('we can delete a blog', async () => {
    const initialBlogs = await helper.blogsInDb()
    const lastPost = initialBlogs.at(-1)

    await api
      .delete('/api/blogs/' + lastPost.id)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const updatedBackend = await helper.blogsInDb()

    expect(updatedBackend).not.toMatchObject({
      'id': lastPost.id
    })
  })

  test('deleting a blog fails when not authenticated', async () => {
    const initialBlogs = await helper.blogsInDb()
    const lastPost = initialBlogs.at(-1)

    await api
      .delete('/api/blogs/' + lastPost.id)
      .expect(401)
  })

  test('we can update a blog', async () => {
    const dbInitialBlogs = await helper.blogsInDb()

    const randomBlog = dbInitialBlogs
      .at(Math.floor(Math.random() * dbInitialBlogs.length))

    const randomLikesNumber = Math.floor(Math.random() * 1000)

    await api
      .put('/api/blogs/' + randomBlog.id)
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...randomBlog,
        likes: randomLikesNumber
      })
      .expect(200)

    const updatedBackend = await helper.blogsInDb()

    const updatedBlog = updatedBackend.find(blog => blog.id === randomBlog.id)

    expect(updatedBlog).toMatchObject({
      'id': randomBlog.id,
      'likes': randomLikesNumber
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})