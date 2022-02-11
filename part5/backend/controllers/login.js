const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')
const logger = require('../utils/logger')

loginRouter.post('/', async (req, res) => {
	const { body } = req

	logger.info(`User: ${ body.username } attempt logging in.`)

	const user = await User.findOne({ username: body.username })
	const passwordCorrect = (user === null)
		? false
		: await bcrypt.compare(body.password, user.passwordHash)

	if (!(user && passwordCorrect)) {
		logger.info(`User: ${ body.username } failed - invalid credentials`)
		return res.status(401).json({
			error: 'invalid username or password',
		})
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	}

	const token = jwt.sign(
		userForToken,
		config.SECRET,
		// { expiresIn: 60 * 60 },
	)

	logger.info(`User ${ body.username } logged in successfully`)

	res
		.status(200)
		.send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
