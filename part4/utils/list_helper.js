const _ = require('lodash')

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
	const blog = blogs.reduce((max, cur) => (
		(cur.likes > max.likes)
			? cur
			: max
	), { likes: -1 })
	console.log(blog)
	return (blog.likes >= 0) ? blog : null
}

const mostBlogs = (blogs) => {
	if (blogs.length === 0) return {}
	console.log(blogs)

	const tally = _.countBy(blogs, 'author')

	const most = _.toPairs(tally)
		.reduce((max, cur) => (
			(cur[1] > max[1]) ? cur : max), [0, -1])

	return { author: most[0], blogs: most[1] }
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
}
