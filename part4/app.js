const express = require('express')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

const userRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const logger = require('./utils/logger')

const app = express()

logger.info(`Connecting to ${config.MONGODB_URI}`)
mongoose.connect(config.MONGODB_URI)
	.then(() => logger.info('Connected to MongoDB'))
	.catch((err) => {
		logger.error('Error connecting to MongoDB', err.message)
	})

app.use(cors())
// app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/users', userRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
