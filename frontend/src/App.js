import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { createBlogActionCreator, deleteBlogActionCreator, getBlogsActionCreator, likeBlogActionCreator } from './reducers/blogsReducer'
import { setNotification } from './reducers/notificationReducer'
import loginService from './services/login'
import storageService from './services/storage'


const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const blogs = useSelector(s => s.blogs)

  useEffect(() => {
    const user = storageService.loadUser()
    setUser(user)
  }, [])

  useEffect(() => {
    dispatch(getBlogsActionCreator())
  }, [])


  const notify = text => dispatch(setNotification(text))

  if (user === null) {
    const login = async event => {
      event.preventDefault()
      const loginRes = await loginService.login({ username, password })

      if (loginRes.error) {
        notify(loginRes.error)
        return
      }

      console.log('loginRes', loginRes)
      setUser(loginRes)
      storageService.saveUser(loginRes)
      notify(`you are logged in as ${loginRes.username}`)
    }

    return (
      <div>
        <h2>Log in to application</h2>
        <Notification/>
        <form onSubmit={login}>
          <div>username: <input
            name='username'
            type='text'
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          /></div>
          <div>password: <input
            name='password'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          /></div>
          <button>login</button>
        </form>
      </div>
    )
  }

  const logout = () => {
    setUser(null)
    storageService.removeUser()
    notify('user logged out')
  }

  const createBlog = async (blogInfo) => {
    return await dispatch(createBlogActionCreator(blogInfo))
  }

  const likeBlog = async blog => {
    dispatch(likeBlogActionCreator(blog))
  }

  const removeBlog = async blog => {
    if(window.confirm(`remove ${blog.title} by ${blog.author}`)){
      dispatch(deleteBlogActionCreator(blog))
    }
  }

  const byLikes = (ba, bb) => bb.likes - ba.likes
  const sortedBlogs = [...blogs].sort(byLikes)

  return (
    <div>
      <h2>blogs</h2>
      <Notification/>
      <p>User {user.name} is logged in. <button onClick={logout}>logout</button></p>
      <BlogForm createBlog={createBlog}/>
      <ul style={{ listStyle: 'none', padding: 0 }}>{
        sortedBlogs
          .map(blog => <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleRemove={removeBlog}
            handleLikeClick={likeBlog}
          />)}
      </ul>
    </div>
  )
}

export default App