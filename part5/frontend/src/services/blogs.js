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

const config = (token) => {
	return { headers: { Authorization: `Bearer ${token}` }}
}

const addNew = async (newBlog, token) => {
	try {
		const res = await axios.post(baseUrl, newBlog, config(token))
		return res.data
	} catch(e) {
		console.error(e)
	}
}

const deleteOne = async (id, token) => {
	try {
		await axios.delete(baseUrl + `/${id}`, config(token))
		return true
	} catch(e) {
		console.error(e)
	}
}

const like = async (id, token) => {
	try {
		const res = await axios.put(`${baseUrl}/like/${id}`)
		return res.data
			
	} catch(e) {
		console.error(e)
	}
}

const blogService = { getAll, addNew, deleteOne, like }
export default blogService
