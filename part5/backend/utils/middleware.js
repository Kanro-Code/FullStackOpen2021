const jwt = require('jsonwebtoken')
const User = require('../models/user')
const logger = require('./logger')
const config = require('./config')

const requestLogger = (req, res, next) => {
	logger.info(`Method: ${req.method}`)
	logger.info(`Path, ${req.path}`)
	logger.info('Body:', req.body)
	logger.info('---')
	next()
}

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'Unknown Endpoint' })
}

const errorHandler = (err, req, res, next) => {
	logger.error(err.message)

	if (err.name === 'CastError') {
		return res.status(400).send({ error: 'Malformatted Id' })
	}
	if (err.name === 'ValidationError') {
		return res.status(400).json({ error: err.message })
	}
	if (err.name === 'JsonWebTokenError') {
		return res.status(401).json({ error: 'invalid token' })
	}
	if (err.name === 'TokenExpiredError') {
		return res.status(401).json({ error: 'token expired' })
	}

	next(err)
}

const tokenExtractor = (req, res, next) => {
	const auth = req.get('authorization')

	if (auth && auth.toLowerCase().startsWith('bearer ')) {
		req.token = auth.substring(7)
	} else {
		req.token = null
	}

	next()
}

const userExtractor = async (req, res, next) => {
	const { id } = jwt.verify(req.token, config.SECRET)
	const user = await User.findById(id)
	if (!user) {
		return res.status(401).json({ error: 'token missing or invalid' })
	}
	req.user = user

	next()
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor,
}
