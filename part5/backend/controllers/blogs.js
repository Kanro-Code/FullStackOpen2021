const router = require('express').Router()

const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

router.get('/', async (req, res) => {
	const notes = await Blog
		.find({}).populate('user', { username: 1, name: 1 })

	res.json(notes)
})

router.post('/', async (req, res) => {
	if (!req.user) {
		return res.status(401).json({ error: 'token missing or invalid' })
	}

	const { user } = req
	const blog = new Blog({ ...req.body, user: user.id })

	const savedBlog = await blog
		.save()

	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	await savedBlog.populate('user', { username: 1, name: 1 })

	res.status(201).json(savedBlog)
})

router.delete('/:id', async (req, res) => {
	const blogToDelete = await Blog.findById(req.params.id)
	if (!blogToDelete) {
		return res.status(204).end()
	}

	if (blogToDelete.user && blogToDelete.user.toString() !== req.user.id) {
		return res.status(401).json({
			error: 'only the creator can delete a blog',
		})
	}

	await Blog.findByIdAndRemove(req.params.id)

	res.status(204).end()
})

router.put('/:id', async (req, res) => {
	const blog = req.body

	const updatedBlog = await Blog
		.findByIdAndUpdate(
			req.params.id,
			blog,
			{ new: true, runValidators: true, context: 'query' },
		)

	res.json(updatedBlog)
})

router.put('/like/:id', userExtractor, async (req, res) => {
	if (!req.user) {
		return res.status(401).json({ error: 'token missing or invalid' })
	}

	const { id } = req.params

	const blog = await Blog.findByIdAndUpdate(
		id,
		{ $inc: { likes: 1 } },
		{ new: true },
	).populate('user', { username: 1, name: 1 })

	res.status(201).json(blog)
})

module.exports = router
