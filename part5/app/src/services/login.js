import axios from 'axios'

const baseUrl = '/api/login'

const login = async (credentials) => {
	const res = await axios.post(baseUrl, credentials)
	console.log(res.data)
	return res.data
}

const LoginService = {
	login,
}

export default LoginService
