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
	test('succeeds with a valid id', async () => {
		const blogs = await helper.blogsInDb()
		const blog = blogs[0]

		const res = await api
			.get(`/api/blogs/${blog.id}`)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const blogProcess = JSON.parse(JSON.stringify(blog))
		expect(res.body).toEqual(blogProcess)
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

	test('add a blog with missing likes properties, default to 0', async () => {
		const blog = {
			title: 'Missing likes count',
			author: 'bing',
			url: 'bing.com',
		}

		const res = await api
			.post('/api/blogs')
			.send(blog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		expect(res.body.likes).toBe(0)
	}, 100000)

	test('reject a blog with missing url or title', async () => {
		const blogMissingUrl = {
			title: 'Missing url',
		}
		let res = await api
			.post('/api/blogs')
			.send(blogMissingUrl)
			.expect(400)

		expect(res.body.error).toBeDefined()

		const blogMissingTitle = {
			url: 'Missing title',
		}

		res = await api
			.post('/api/blogs')
			.send(blogMissingTitle)
			.expect(400)

		expect(res.body.error).toBeDefined()

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(helper.mockupBlogs.length)
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
		const blogsAtStart = await helper.blogsInDb()
		const blogToRemove = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToRemove.id}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(helper.mockupBlogs.length - 1)

		const urls = blogsAtEnd.map((n) => n.url)
		expect(urls).not.toContain(blogToRemove.url)
	})
})

describe('updating of a single blog', () => {
	test('update all attributes and returns 200 and correct json', async () => {
		const blogToUpdate = await helper.getSingleBlog()

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

afterAll(() => {
	mongoose.connection.close()
})
