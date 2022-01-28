const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res, next) => {
	Blog
		.find({})
		.then((blogs) => res.json(blogs))
		.catch((err) => next(err))
})

blogsRouter.post('/', (req, res, next) => {
	const blog = new Blog(req.body)

	blog
		.save()
		.then((result) => {
			res.status(201).json(result)
		})
		.catch((err) => next(err))
})

blogsRouter.get('/:id', (req, res, next) => {
	Blog
		.findById(req.params.id)
		.then((blog) => res.json(blog))
		.catch((err) => next(err))
})

blogsRouter.delete('/:id', (req, res, next) => {
	Blog
		.findByIdAndRemove(req.params.id)
		.then(() => res.status(204).end())
		.catch((err) => next(err))
})

module.exports = blogsRouter
