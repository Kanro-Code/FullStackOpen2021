const bcrypt = require('bcrypt')
const { application } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')

const mockupBlogs = () => ([
	{
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
	},
	{
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
	},
	{
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
	},
	{
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 10,
	},
	{
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0,
	},
	{
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
	},
])

const mockupUsers = () => (
	[
		{
			username: 'GoodName123',
			name: 'Good U. Name',
			password: '16letters4symbols',
		},
		{
			username: 'TestingUser',
			name: 'SuperUser',
			password: 'oldpassword+!',
		},
	]
)

const nonExisitingId = async () => {
	const blog = new Blog({
		title: 'TESTdelete', author: 'TESTdelete', url: 'TESTdelete', likes: 0,
	})

	await blog.save()
	await blog.remove()

	return blog._id.toString()
}

const blogsInDb = async () => {
	const blogs = Blog.find({})
	return (await blogs).map((n) => n.toJSON())
}

const usersInDb = async () => {
	const users = User.find({})
	return (await users).map((n) => n.toJSON())
}

const createUser = async (username = 'root') => {
	const passwordHash = await bcrypt.hash('password', 10)
	const user = new User({
		username,
		name: username,
		passwordHash,
	})

	return user.save()
}

const loginUser = async (user, api) => {
	const { username } = user
	const password = 'password'

	const res = await api
		.post('/api/login')
		.send({ username, password })
		.expect(200)
		.expect('Content-Type', /application\/json/)

	return res.body.token
}

module.exports = {
	mockupBlogs,
	mockupUsers,
	nonExisitingId,
	blogsInDb,
	usersInDb,
	createUser,
	loginUser,
}
