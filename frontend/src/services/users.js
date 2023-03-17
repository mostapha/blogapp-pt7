import axios from 'axios'
const baseUrl = '/api/users'

const getUsers = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getUser = userId => {
  const request = axios.get(`${baseUrl}/${userId}`)
  return request.then(response => response.data)
}

export default { getUsers, getUser }