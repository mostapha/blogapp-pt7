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
  try {
    const response = await axios.post(baseUrl, blogInfo, config())
    return response.data
  } catch (error) {
    if(error.response.data.error){
      return error.response.data
    }
    console.error(error)
  }
}

const updateBlog = async (blogId, blogInfo) => {
  try {
    const response = await axios.put(`${baseUrl}/${blogId}`, blogInfo, config())
    return response.data
  } catch (error) {
    if(error.response.data.error){
      return error.response.data
    }
    console.error(error)
  }
}

const removeBlog = async (blogId) => {
  try {
    const response = await axios.delete(`${baseUrl}/${blogId}`, config())
    return response.data
  } catch (error) {
    if(error.response.data.error){
      return error.response.data
    }
    console.error(error)
  }
}

export default { getAll, createBlog, updateBlog, removeBlog }