import axios from 'axios'
import storageService from '../services/storage'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const config = () => ({
  headers: {
    Authorization: storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
  }
})

const createBlog = async blogInfo => {
  const response = await axios.post(baseUrl, blogInfo, config())
  return response.data
}

const updateBlog = async (blogId, blogInfo) => {
  const response = await axios.put(`${baseUrl}/${blogId}`, blogInfo, config())
  return response.data
}

const removeBlog = async (blogId) => {
  const response = await axios.delete(`${baseUrl}/${blogId}`, config())
  return response.data
}

export default { getAll, createBlog, updateBlog, removeBlog }