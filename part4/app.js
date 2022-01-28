const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')

const app = express()

logger.info(`Connecting to ${config.MONGODB_URI}`)
console.log(config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
	.then(() => logger.info('Connected to MongoDB'))
	.catch((err) => {
		logger.error('Error connecting to MongoDB', err.message)
	})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use(config.BLOG_API, blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
