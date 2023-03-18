import axios from 'axios'
import storageService from '../services/storage'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
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

const getBlog = async (blogId) => {
  const response = await axios.get(`${baseUrl}/${blogId}`, config())
  return response.data
}

const getBlogComments = async blogId => {
  const response = await axios.get(`${baseUrl}/${blogId}/comments`, config())
  return response.data
}

export default { getAll, createBlog, updateBlog, removeBlog, getBlog, getBlogComments }