import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlogActionCreator, getBlogsActionCreator } from '../reducers/blogsReducer'
import Blog from './Blog'
import BlogForm from './BlogForm'

const Homepage = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(s => s.blogs)
  const user = useSelector(s => s.user)

  useEffect(() => {
    dispatch(getBlogsActionCreator())
  }, [])



  const removeBlog = async blog => {
    if(window.confirm(`remove ${blog.title} by ${blog.author}`)){
      dispatch(deleteBlogActionCreator(blog))
    }
  }

  const byLikes = (ba, bb) => bb.likes - ba.likes
  const sortedBlogs = [...blogs].sort(byLikes)

  return (
    <>
      <BlogForm/>
      <ul style={{ listStyle: 'none', padding: 0 }}>{
        sortedBlogs
          .map(blog => <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleRemove={removeBlog}
          />)}
      </ul>
    </>
  )
}

export default Homepage