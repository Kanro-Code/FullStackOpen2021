import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then((res) => res.data)
}

const setToken = (newToken) => {
	token = `Bearer ${newToken}`
	console.log(token)
}

const BlogService = {
	getAll,
	setToken,
	token,
}

export default BlogService
