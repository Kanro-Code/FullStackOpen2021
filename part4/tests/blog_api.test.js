const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})
	const blogObjects = helper.mockupBlogs.map((b) => new Blog(b))
	const promises = blogObjects.map((b) => b.save())
	await Promise.all(promises)
}, 100000)

describe('blog api test', () => {
	test('all blogs returned as json', async () => {
		const res = await api.get('/api/blogs')

		expect(res.body).toHaveLength(helper.mockupBlogs.length)
	}, 100000)

	test('a specficic blog is within the returned blogs', async () => {
		const res = await api.get('/api/blogs')

		const titles = res.body.map((b) => b.title)
		expect(titles).toContain('Go To Statement Considered Harmful')
	}, 100000)
})

afterAll(() => {
	mongoose.connection.close()
})
