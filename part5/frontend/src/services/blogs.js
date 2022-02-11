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

const blogService = { getAll }
export default blogService
