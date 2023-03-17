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
    },
    deleteBlogAction(state, action){
      const id = action.payload
      return state.filter(b => b.id !== id)
    },
    likeBlogAction(state, action){
      const blog = action.payload
      const blog_to_update = state.find(b => b.id === blog.id)
      blog_to_update.likes = blog.likes
    }
  },
})

const { initializeBlogsAction, addBlogAction, deleteBlogAction, likeBlogAction } = slice.actions

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

export const deleteBlogActionCreator = blog => {
  return async dispatch => {
    try {
      await blogService.removeBlog(blog.id)
      dispatch(deleteBlogAction(blog.id))
      dispatch(setNotification(`You deleted the blog '${blog.title}'`))
    } catch(err) {
      dispatch(setNotification('there was error deleting the blog'))
    }
  }
}

export const likeBlogActionCreator = blog => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.updateBlog(blog.id, {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      })

      dispatch(likeBlogAction(updatedBlog))
      dispatch(setNotification(`You liked '${blog.title}'`))
    } catch(err) {
      dispatch(setNotification('there was error updating the blog data'))
    }
  }
}

export default slice.reducer