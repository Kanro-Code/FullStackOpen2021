const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is initially one user in db', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('secret', 10)
		const user = new User({ username: 'root', passwordHash })

		await user.save()
	}, 100000)

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = helper.mockupUsers()[0]

		await api
			.post('/api/users')
			.send(newUser)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(n => n.username)
		expect(usernames).toContain(newUser.username)
	}, 100000)

	test('creation fails with proper statuscode and message if username already taken', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = helper.mockupUsers()[0]
		newUser.username = 'root'

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('`username` to be unique')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	}, 100000)

	test('creation fails with proper statuscode and message if username too short', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = helper.mockupUsers()[0]
		newUser.username = 'sh'

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('is shorter than the minimum allowed length')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	}, 100000)

	test('creation fails with proper statuscode and message if password too short', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = helper.mockupUsers()[0]
		newUser.password = 'short'

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('Password is too short')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})
}, 100000)

afterAll(() => {
	mongoose.connection.close()
})
