const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
	const { body } = req
	const { username, name } = body

	if (body.password.length < 8) {
		return res.status(400).json({ error: 'Password is too short' })
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	const user = new User({
		username,
		name,
		passwordHash,
	})

	const savedUser = await user.save()

	res.json(savedUser)
})


module.exports = usersRouter
