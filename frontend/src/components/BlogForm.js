import { useRef, useState } from 'react'
import FormInput from './FormInput'
import Togglable from './Togglable'
import { useDispatch } from 'react-redux'
import { createBlogActionCreator } from '../reducers/blogsReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const addBlogFormRef = useRef()

  const createBlog = async (blogInfo) => {
    return await dispatch(createBlogActionCreator(blogInfo))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const succeed = await createBlog({
      title,
      author,
      url
    })

    if(succeed){
      setTitle('')
      setAuthor('')
      setUrl('')

      addBlogFormRef.current.toggleVisibility()
    }
  }

  return (
    <Togglable buttonLabel='new blog' ref={addBlogFormRef}>
      <section>
        <h2>create a new blog</h2>
        <form onSubmit={handleSubmit}>
          <FormInput label='title' value={title} onChange={event => {setTitle(event.target.value)}}/>
          <FormInput label='author' value={author} onChange={event => {setAuthor(event.target.value)}}/>
          <FormInput label='url' value={url} onChange={event => {setUrl(event.target.value)}}/>
          <button type='submit'>create</button>
        </form>
      </section>
    </Togglable>
  )
}

export default BlogForm