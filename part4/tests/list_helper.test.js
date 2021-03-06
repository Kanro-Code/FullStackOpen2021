const listHelper = require('../utils/list_helper')

const { mockupBlogs } = require('./test_helper')

test('dummy return one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

describe('totalLikes', () => {
	test('returns 0', () => {
		const emptyList = []

		const result = listHelper.totalLikes(emptyList)
		expect(result).toBe(0)
	})

	test('list item with 0 likes returns 0', () => {
		const listWith0LikesBlog = [
			{ likes: 0 },
		]

		const result = listHelper.totalLikes(listWith0LikesBlog)
		expect(result).toBe(0)
	})

	test('premade list returns 36', () => {
		const result = listHelper.totalLikes(mockupBlogs())
		expect(result).toBe(36)
	})

	test('return 10', () => {
		const listWith10Likes = [
			{ likes: 8 },
			{ likes: 2 },
			{ likes: 0 },
		]

		const result = listHelper.totalLikes(listWith10Likes)
		expect(result).toBe(10)
	})

	test('negative likes are not counted', () => {
		const blogs = [
			{ likes: 1 },
			{ likes: 2 },
			{ likes: -1 },
			{ likes: -5 },
		]

		const result = listHelper.totalLikes(blogs)
		expect(result).toBe(3)
	})
})

describe('favoriteBlog', () => {
	test('empty list returns null', () => {
		const blogs = []

		const result = listHelper.favoriteBlog(blogs)
		expect(result).toBe(null)
	})

	test('single item in blog list returns that item', () => {
		const blogs = [{
			_id: '5a422bc61b54a676234d17fc',
			title: 'Type wars',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
			likes: 2,
			__v: 0,
		}]

		const result = listHelper.favoriteBlog(blogs)
		expect(result).toEqual(blogs[0])
	})

	test('single item in blog list with 0 likes', () => {
		const blogs = [{
			_id: '5a422b891b54a676234d17fa',
			title: 'First class tests',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
			likes: 0,
			__v: 0,
		}]

		const result = listHelper.favoriteBlog(blogs)
		expect(result).toEqual(blogs[0])
	})

	test('mockupBlogs returns correct blog', () => {
		const result = listHelper.favoriteBlog(mockupBlogs())
		expect(result).toEqual(mockupBlogs()[2])
	})
})

describe('mostBlogs', () => {
	test('empty array returns empty object', () => {
		const result = listHelper.mostBlogs([])
		expect(result).toEqual({})
	})

	test('single item return said object', () => {
		const blog = mockupBlogs().slice(3, 4)
		const result = listHelper.mostBlogs(blog)
		expect(result).toEqual({ author: 'Robert C. Martin', blogs: 1 })
	})

	test('full list with one answer', () => {
		const result = listHelper.mostBlogs(mockupBlogs())
		expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
	})
})

describe('mostLikes', () => {
	test('empty array return empty object', () => {
		const result = listHelper.mostLikes([])
		expect(result).toEqual({})
	})

	test('single item return said object', () => {
		const blog = mockupBlogs().slice(1, 2)
		const result = listHelper.mostLikes(blog)
		expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 })
	})

	test('single item with 0 likes', () => {
		const blog = mockupBlogs().slice(4, 5)
		const result = listHelper.mostLikes(blog)
		expect(result).toEqual({ author: 'Robert C. Martin', likes: 0 })
	})

	test('full list with one answer', () => {
		const result = listHelper.mostLikes(mockupBlogs())
		expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
	})
})
