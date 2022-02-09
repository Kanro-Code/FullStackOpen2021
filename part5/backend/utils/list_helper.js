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
	return (blog.likes >= 0) ? blog : null
}

const maxKeyValuePair = (obj) => (
	_.toPairs(obj)
		.reduce((max, cur) => (
			(cur[1] > max[1]) ? cur : max), [0, -1])
)

const mostBlogs = (blogs) => {
	if (blogs.length === 0) return {}

	const tally = _.countBy(blogs, 'author')
	const most = maxKeyValuePair(tally)

	return { author: most[0], blogs: most[1] }
}

const mostLikes = (blogs) => {
	if (blogs.length === 0) return {}

	const dict = {}
	blogs.forEach(({ author, likes }) => {
		dict[author] = dict[author] + likes || likes
	})
	const most = maxKeyValuePair(dict)

	return { author: most[0], likes: most[1] }
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
}
