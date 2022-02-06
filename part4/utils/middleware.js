/* eslint-disable no-else-return */
const logger = require('./logger')

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

// eslint-disable-next-line consistent-return
const errorHandler = (err, req, res, next) => {
	logger.error(err.message)

	if (err.name === 'CastError') {
		return res.status(400).send({ error: 'Malformatted Id' })
	} else if (err.name === 'ValidationError') {
		return res.status(400).json({ error: err.message })
	} else if (err.name === 'JsonWebTokenError') {
		return res.status(401).json({ error: 'invalid token' })
	} else if (err.name === 'TokenExpiredError') {
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
	logger.info(req.token)

	next()
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
}
