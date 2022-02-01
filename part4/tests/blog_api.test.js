const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})

	const blogObjects = helper.mockupBlogs.map((n) => new Blog(n))
	const promises = blogObjects.map((n) => n.save())
	await Promise.all(promises)
}, 100000)

describe('fecth all blogs', () => {
	test('all blogs returned as json', async () => {
		const res = await api.get('/api/blogs')

		expect(res.body).toHaveLength(helper.mockupBlogs.length)
	}, 100000)

	test('a specficic blog is within the returned blogs', async () => {
		const res = await api.get('/api/blogs')

		const titles = res.body.map((n) => n.title)
		expect(titles).toContain('Go To Statement Considered Harmful')
	}, 100000)
})

describe('viewing specific single blog', () => {
	test('check if Id is gone after deleting', async () => {
		const id = await helper.nonExisitingId()
		await api
			.get(`/api/blogs/${id}`)
			.expect(404)
	}, 10000)
})

describe('post single blog', () => {
	test('add a blog, and verify that its added', async () => {
		const blog = {
			title: 'Single test',
			author: 'Stackoverflow',
			url: 'https://stackoverflow.com/questions/41132933/running-a-single-test-file',
			likes: 0,
		}

		const res = await api
			.post('/api/blogs')
			.send(blog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		expect(res.body.id).toBeDefined()
		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.mockupBlogs.length + 1)

		const urls = blogsAtEnd.map((n) => n.url)
		expect(urls).toContain(blog.url)
	}, 100000)

	test('fails with status code 400 if data invalid', async () => {
		const blog = {
			title: 'Missing rest of content',
		}

		await api
			.post('/api/blogs')
			.send(blog)
			.expect(400)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.mockupBlogs.length)
	})

	test('check if blog._id is hidden and replaced by blog.id', async () => {
		const res = await api.get('/api/blogs')
		expect(res.body[0].id).toBeDefined()
		expect(res.body[0]._id).toBeUndefined()
	}, 100000)
})

afterAll(() => {
	mongoose.connection.close()
})
