import axios from 'axios'

const baseUrl = '/api/blogs'

async function getAll(token) {
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	}

	try {
		const res = await axios.get(baseUrl, config)
		return res.data
	} catch (e) {
		console.error(e)
		return null
	}
}

const config = (token) => ({ headers: { Authorization: `Bearer ${token}` } })

async function addNew(newBlog, token) {
	try {
		const res = await axios.post(baseUrl, newBlog, config(token))
		return res.data
	} catch (e) {
		console.error(e)
		return null
	}
}

async function deleteOne(id, token) {
	try {
		await axios.delete(`${baseUrl}/${id}`, config(token))
		return true
	} catch (e) {
		console.error(e)
		return null
	}
}

async function like(id) {
	try {
		const res = await axios.put(`${baseUrl}/like/${id}`)
		return res.data
	} catch (e) {
		console.error(e)
		return null
	}
}

const blogService = { getAll, addNew, deleteOne, like }
export default blogService
