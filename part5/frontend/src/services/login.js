import axios from 'axios'
const baseUrl = '/api/login'

const login = async (username, password) => {
	try {
		const post = await axios.post(baseUrl, { username, password })
		return post.data.token
	} catch(e) {
		console.log(e)
		return null
	}
}

const loginService = { login }
export default loginService
