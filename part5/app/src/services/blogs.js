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
		config.headers.Authorization = `bearer ${newToken}`
	} else {
		config.headers.Authorization = null
	}
}

const create = async (blog) => {
	const res = await axios
		.post(baseUrl, blog, config)

	return res.data
}

const like = async (id) => {
	const res = await axios
		.put(`${baseUrl}/like/${id}`, null, config)

	return res.data
}

const BlogService = {
	getAll,
	setToken,
	create,
	like,
}

export default BlogService
