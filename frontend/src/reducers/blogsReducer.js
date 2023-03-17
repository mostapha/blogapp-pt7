import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

// create slice
const initialValue = []
const slice = createSlice({
  name: 'blogs',
  initialState: initialValue,
  reducers: {
    initializeBlogsAction(state, action){
      return action.payload
    },
    addBlogAction(state, action) {
      state.push(action.payload)
    }
  },
})

const { initializeBlogsAction, addBlogAction } = slice.actions

export const getBlogsActionCreator = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(initializeBlogsAction(blogs))
  }
}

export const createBlogActionCreator = (blogInfo) => {
  return async dispatch => {
    try {
      const createdBlog = await blogService.createBlog(blogInfo)
      dispatch(addBlogAction(createdBlog))
      dispatch(setNotification(`a new blog is added (${createdBlog.title} By ${createdBlog.author})`))
      return true
    } catch(err) {
      dispatch(setNotification('there was error creating blog'))
      return false
    }
  }
}

export default slice.reducer