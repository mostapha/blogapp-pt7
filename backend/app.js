const config = require('./utils/config')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')


mongoose.set('strictQuery', false)

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')


const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl).then(() => {
  logger.info('connected to MongoDB')
}).catch((error) => {
  logger.error('error connecting to MongoDB:', error.message)
})

app.use(cors())
app.use(express.json())

app.use('/api/login', loginRouter)
app.use('/api/blogs', middleware.tokenExtractor, middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app