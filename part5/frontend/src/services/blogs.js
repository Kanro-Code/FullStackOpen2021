import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getSingle = (id) => {

}

const blogService = { getAll, getSingle }
export default blogService
