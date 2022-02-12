const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog
		.find({})
		.populate('user', { name: 1, username: 1, id: 1 })
	res.json(blogs)
})

blogsRouter.post('/', userExtractor, async (req, res) => {
	const { body } = req
	const user = await User.findById(req.user._id)

	const blog = new Blog(body)
	blog.user = user._id
	const savedBlog = await blog.save()

	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	res.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (req, res) => {
	const blog = await Blog
		.findById(req.params.id)
		.populate('user')
	if (blog) {
		res.json(blog)
	} else {
		res.status(404).end()
	}
})

blogsRouter.put('/:id', async (req, res) => {
	const { id } = req.params

	const blog = await Blog
		.findByIdAndUpdate(id, req.body, { new: true })
	res.json(blog)
})

blogsRouter.put('/like/:id', async (req, res) => {
	const { id } = req.params

	const blog = await Blog
		.findOneAndUpdate(
			{ _id :id },
			{ $inc: { 'likes': 1} },
			{ new: true }
		)
	res.json(blog)
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
	const blog = await Blog.findById(req.params.id)
	const { user } = req

	if (!blog) {
		return res.status(404).end()
	}

	if (user._id.toString() !== blog.user.toString()) {
		return res.status(403).end()
	}

	await Blog.findByIdAndRemove(req.params.id)
	res.status(204).end()
})

module.exports = blogsRouter
