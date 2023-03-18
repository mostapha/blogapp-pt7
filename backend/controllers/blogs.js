const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username:1, name:1, id: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username:1, name:1, id: 1 })
  response.json(blog)
})

blogsRouter.post('/', middleware.requireAuth, async (request, response) => {
  const { title, author, likes, url } = request.body

  if(!title){
    return response.status(400).json({
      error: 'The blog title is required'
    })
  }

  if(!url){
    return response.status(400).json({
      error: 'The blog url is required'
    })
  }

  const user = await User.findById(request.user)

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes === undefined ? 0 : likes,
    user: user.id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(await savedBlog.populate('user', { username:1, name:1, id: 1 }))
})

// helper and not within exercises
blogsRouter.delete('/all', middleware.requireAuth, async (request, response) => {
  const { deletedCount } = await Blog.deleteMany({})
  response.status(200).json({ deletedCount })
})


blogsRouter.delete('/:id', middleware.requireAuth, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(blog.user.toString() !== request.user){
    return response.status(401).json({ error: 'you can only delete blogs you created' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', middleware.requireAuth, async (request, response) => {
  const { title, author, likes = 0, url, user } = request.body

  if(!title){
    return response.status(400).json({
      error: 'The blog title is required'
    })
  }

  if(!url){
    return response.status(400).json({
      error: 'The blog url is required'
    })
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,
    { title, author, likes, url, user },
    { new: true, runValidators: true, context: 'query' })

  console.log('updatedBlog', updatedBlog)
  response.json(await updatedBlog.populate('user', { username:1, name:1, id: 1 }))
})

module.exports = blogsRouter