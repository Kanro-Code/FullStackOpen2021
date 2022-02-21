import axios from 'axios'

const baseUrl = '/api/blogs'

const config = {
	headers: { Authorization: null },
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then((res) => res.data)
}

const setToken = (newToken) => {
	if (newToken) {
		config.headers.Authorization = `Bearer ${newToken}`
	} else {
		config.headers.Authorization = null
	}
}

const create = async (blog) => {
	const res = await axios
		.post(baseUrl, blog, config)

	return res.data
}

const BlogService = {
	getAll,
	setToken,
	create,
}

export default BlogService
