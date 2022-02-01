const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({})
	res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
	const blog = new Blog(req.body)

	const savedBlog = blog.save()
	res.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (req, res) => {
	const blog = await Blog.findById(req.params.id)
	res.json(blog)
})

blogsRouter.delete('/:id', async (req, res) => {
	const blog = await Blog.findByIdAndRemove(req.params.id)
	res.status(204).end()
})

module.exports = blogsRouter
