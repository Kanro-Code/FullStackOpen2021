const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

const createUser = async (username = 'root') => {
	const passwordHash = await bcrypt.hash('password', 10)
	const user = new User({
		username,
		name: username,
		passwordHash,
	})
	return user.save()
}

const loginUser = async (user) => {
	const { username } = user
	const password = 'password'

	const res = await api
		.post('/api/login')
		.send({ username, password })
		.expect(200)
		.expect('Content-Type', /application\/json/)
	return res.body.token
}

beforeEach(async () => {
	await User.deleteMany({})
	await Blog.deleteMany({})

	const user = await createUser()

	const promises = helper.mockupBlogs().map((n) => {
		const blog = new Blog({ ...n, user })
		return blog.save()
	})

	await Promise.all(promises)
}, 100000)

describe('fecth all blogs', () => {
	test('all blogs returned as json', async () => {
		const res = await api.get('/api/blogs')

		expect(res.body).toHaveLength(helper.mockupBlogs().length)
	}, 100000)

	test('a specficic blog is within the returned blogs', async () => {
		const res = await api.get('/api/blogs')

		const titles = res.body.map((n) => n.title)
		expect(titles).toContain('Go To Statement Considered Harmful')
	}, 100000)
})

describe('viewing specific single blog', () => {
	test('succeeds with a valid id', async () => {
		const blogs = await helper.blogsInDb()
		const blog = blogs[0]

		const res = await api
			.get(`/api/blogs/${blog.id}`)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(res.body.id).toBeDefined()
		expect(res.body.title).toBe(blog.title)
	})

	test('fails with 404 if blog does not exist', async () => {
		const id = await helper.nonExisitingId()
		await api
			.get(`/api/blogs/${id}`)
			.expect(404)
	}, 10000)

	test('fails with 400 if id is invalid', async () => {
		const id = '5a3d5da59070081a82a35'
		await api
			.get(`/api/blogs/${id}`)
			.expect(400)
	})
})

describe('post single blog', () => {
	test('add a blog, and verify that its added', async () => {
		const users = await helper.usersInDb()
		const token = await loginUser(users[0])
		const blog = {
			title: 'Single test',
			author: 'Stackoverflow',
			url: 'https://stackoverflow.com/questions/41132933/running-a-single-test-file',
			likes: 0,
		}

		const res = await api
			.post('/api/blogs')
			.set({ Authorization: `Bearer ${token}` })
			.send(blog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		expect(res.body.id).toBeDefined()
		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.mockupBlogs().length + 1)

		const urls = blogsAtEnd.map((n) => n.url)
		expect(urls).toContain(blog.url)
	}, 100000)

	test('fail to add a blog with missing authorization token', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blog = blogsAtStart[0]

		await api
			.post('/api/blogs')
			.send(blog)
			.expect(401)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtStart).toHaveLength(blogsAtEnd.length)
	})

	test('add a blog with missing likes properties, default to 0', async () => {
		const users = await helper.usersInDb()
		const token = await loginUser(users[0])
		const blog = {
			title: 'Missing likes count',
			author: 'bing',
			url: 'bing.com',
		}

		const res = await api
			.post('/api/blogs')
			.set({ Authorization: `Bearer ${token}` })
			.send(blog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		expect(res.body.likes).toBe(0)
	}, 100000)

	test('reject a blog with missing url or title', async () => {
		const users = await helper.usersInDb()
		const token = await loginUser(users[0])
		const blogMissingUrl = {
			title: 'Missing url',
		}
		let res = await api
			.post('/api/blogs')
			.set({ Authorization: `Bearer ${token}` })
			.send(blogMissingUrl)
			.expect(400)

		expect(res.body.error).toBeDefined()

		const blogMissingTitle = {
			url: 'Missing title',
		}

		res = await api
			.post('/api/blogs')
			.set({ Authorization: `Bearer ${token}` })
			.send(blogMissingTitle)
			.expect(400)

		expect(res.body.error).toBeDefined()

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(helper.mockupBlogs().length)
	}, 100000)

	test('check if blog._id is hidden and replaced by blog.id', async () => {
		const res = await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(res.body[0].id).toBeDefined()
		expect(res.body[0]._id).toBeUndefined()
	}, 100000)
})

describe('deletion of a single blog', () => {
	test('succeeds with status code 204 if id is valid', async () => {
		const users = await helper.usersInDb()
		const token = await loginUser(users[0])
		const blogsAtStart = await helper.blogsInDb()
		const blogToRemove = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToRemove.id}`)
			.set({ Authorization: `Bearer ${token}` })
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(helper.mockupBlogs().length - 1)

		const urls = blogsAtEnd.map((n) => n.url)
		expect(urls).not.toContain(blogToRemove.url)
	})

	test('fails to deleted if authentication is missing', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToRemove = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToRemove.id}`)
			.expect(401)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
	})
})

describe('updating of a single blog', () => {
	test('update all attributes and returns 200 and correct json', async () => {
		const blogs = await helper.blogsInDb()
		const blogToUpdate = blogs[0]
		console.log(blogToUpdate)

		blogToUpdate.author = 'Author name changed'
		blogToUpdate.url = 'https://urlhasbeenupdated.com'
		blogToUpdate.title = 'Title has also changed'
		blogToUpdate.likes += 1

		const res = await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(blogToUpdate)
			.expect(200)

		const processedBlog = JSON.parse(JSON.stringify(blogToUpdate))
		expect(res.body).toEqual(processedBlog)

		expect(res.body.id).toBe(blogToUpdate.id)
	})

	test('only update likes', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToUpdate = blogsAtStart[0]
		blogToUpdate.likes += 1

		const res = await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(blogToUpdate)
			.expect(200)

		const processedBlog = JSON.parse(JSON.stringify(blogToUpdate))
		expect(res.body).toEqual(processedBlog)
	})
})

describe('unknown endpoint', () => {
	test('unknown endpoint returns 404', async () => {
		await api
			.get('/api/unknownendpoint')
			.expect(404)
	})
})

afterAll((done) => {
	mongoose.connection.close()
	done()
})
