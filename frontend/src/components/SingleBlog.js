import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlogActionCreator } from '../reducers/blogsReducer'
import blogsApi from '../services/blogs'
import Comments from './Comments'

const SingleBlog = () => {
  const blogId = useParams().id
  const [blog, setBlog] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    blogsApi.getBlog(blogId).then(blogInfo => {
      console.log('blogInfo', blogInfo)
      setBlog(blogInfo)
    })
  }, [])


  if(blog === null){
    return <div>Loading...</div>
  }

  const likeBlog = async blog => {
    await dispatch(likeBlogActionCreator(blog))
    setBlog(
      {
        ...blog,
        likes: blog.likes + 1
      }
    )
  }

  return (
    <>
      <h1>{blog.title}</h1>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>{blog.likes} likes <button onClick={() => likeBlog(blog)}>like</button></div>
      <div>added by {blog.user.name}</div>
      <Comments blogId={blog.id}/>
    </>
  )
}

export default SingleBlog