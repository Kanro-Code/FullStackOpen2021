import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async (token) => {
	const config = {
		headers: { Authorization: `Bearer ${token}` }
	}
	try {
		const res = await axios.get(baseUrl, config)
		return res.data
	} catch(e) {
		console.error(e)
	}
}

const addNew = async (newBlog, token) => {
	const config = {
		headers: { Authorization: `Bearer ${token}` }
	}
	try {
		const res = await axios.post(baseUrl, newBlog, config)
		return res.data
	} catch(e) {
		console.error(e)
	}
}

const deleteOne = async (id, token) => {
	const config = {
		headers: { Authorization: `Bearer ${token}`}
	}

	try {
		await axios.delete(baseUrl + `/${id}`, config)
		return true
	} catch(e) {
		console.error(e)
	}
}

const blogService = { getAll, addNew, deleteOne }
export default blogService
