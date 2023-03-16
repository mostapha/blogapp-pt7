const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)


describe('adding user', () => {
  beforeAll(async () => {
    await User.deleteMany({})
  })

  test('succeeds with valid data', async () => {
    await api.post('/api/users')
      .send({
        'username': 'Mostapha',
        'name': 'Mustapha Bouh',
        'password': 'P@$$W0RD'
      })
      .expect(201)
      .expect('Content-Type', /json/)

  })

  test('fails when the username or the password length is less than 3 characters long', async () => {
    {
      const response = await api.post('/api/users')
        .send({
          'username': 'Mo',
          'name': 'Mustapha Bouh',
          'password': 'P@$$W0RD'
        })
        .expect(400)

      expect(response.body.error).toBeDefined()
    }
    {
      const response = await api.post('/api/users')
        .send({
          'username': 'Mostapha',
          'name': 'Mustapha Bouh',
          'password': 'P@'
        })
        .expect(400)

      expect(response.body.error).toBeDefined()
    }
  })

  test('fails when the username or the password are missing', async () => {
    {
      const response = await api.post('/api/users')
        .send({
          'name': 'Mustapha Bouh',
          'password': 'P@$$W0RD'
        })
        .expect(400)

      expect(response.body.error).toBeDefined()
    }

    {
      const response = await api.post('/api/users')
        .send({
          'username': 'Mostapha',
          'name': 'Mustapha Bouh',
        })
        .expect(400)

      expect(response.body.error).toBeDefined()
    }


  })
})

afterAll(async () => {
  await mongoose.connection.close()
})