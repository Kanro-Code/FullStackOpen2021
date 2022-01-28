const Blog = require('../models/blog')

const dummy = () => (1)

const totalLikes = (blogs) => {
	const t = blogs.reduce((total, blog) => {
		if (blog.likes > 0) {
			return total + blog.likes
		}
		return total
	}, 0)
	return t
}

const favoriteBlog = (blogs) => {
	const blog = blogs.indexOf(Math.max(...blogs))
	if (blog === -1) return blog
	return new Blog(blog)
}

module.exports = { dummy, totalLikes, favoriteBlog }
