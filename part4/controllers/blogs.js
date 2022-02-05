const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')

const getTokenFrom = (req) => {
	const auth = req.get('authorization')
	console.log(auth)
	if (auth && auth.toLowerCase().startsWith('bearer ')) {
		return auth.substring(7)
	}
	return null
}

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog
		.find({})
		.populate('user')
	res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
	const token = getTokenFrom(req)
	const decodedToken = jwt.verify(token, config.SECRET)
	if (!decodedToken.id) {
		return res.status(401).json({ error: 'token missing or invalid' })
	}

	const blog = new Blog(req.body)
	const user = await User.findById(decodedToken.id)
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

blogsRouter.delete('/:id', async (req, res) => {
	await Blog.findByIdAndRemove(req.params.id)
	res.status(204).end()
})

module.exports = blogsRouter
