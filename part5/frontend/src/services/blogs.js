import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = (token) => {
	const request = axios.get(baseUrl, {
		headers: {
			'authorization': 'bearer ' + token
		}
	})
	return request.then(response => response.data)
}

const getSingle = (id) => {

}

const blogService = { getAll, getSingle }
export default blogService
