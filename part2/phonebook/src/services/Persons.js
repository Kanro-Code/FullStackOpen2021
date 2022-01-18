import axios from 'axios'
const baseUrl='http://localhost:3030/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(res => res.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(res => res.data)
}

const update = (id, updateObject) => {
  console.log(updateObject)
  const request = axios.put(`${baseUrl}/${id}`, updateObject)
  return request.then(res => res.data)
}

const deleteId = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(res => {
    console.log('error deleting by id', res)
     return res
  })
}

export default { getAll, create, deleteId, update }