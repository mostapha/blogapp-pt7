import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import storageService from './services/storage'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [notification, setNotification] = useState('')

  useEffect(() => {
    const user = storageService.loadUser()
    setUser(user)
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const notify = text => setNotification(text)

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
        <Notification notification={notification} setNotification={setNotification}/>
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

  const likeBlog = async blog => {
    const response = await blogService.updateBlog(blog.id, {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })

    const blogIndex = blogs.findIndex(b => b.id === blog.id)
    const newBlogs = [...blogs]
    newBlogs[blogIndex] = response
    setBlogs(newBlogs)
  }

  const removeBlog = async blog => {
    if(!window.confirm(`remove ${blog.title} by ${blog.author}`)) return

    const response = await blogService.removeBlog(blog.id)
    if(response.error){
      notify(response.error)
      return
    }

    setBlogs(blogs.filter(b => b.id !== blog.id))
  }

  const createBlog = async (blogInfo) => {
    const response = await blogService.createBlog(blogInfo)

    if(response.error){
      notify(response.error)
      return false
    }

    setBlogs(blogs.concat(response))
    notify(`a new blog is added (${response.title} By ${response.author})`)
    return true
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} setNotification={setNotification}/>
      <p>User {user.name} is logged in. <button onClick={logout}>logout</button></p>
      <BlogForm createBlog={createBlog}/>
      {
        blogs.length !== 0
          ? <ul style={{ listStyle: 'none', padding: 0 }}>{
            blogs
              .sort((b1, b2) => b2.likes - b1.likes)
              .map(blog => <Blog
                key={blog.id}
                blog={blog}
                user={user}
                handleRemove={removeBlog}
                handleLikeClick={likeBlog}
              />)
          }</ul>
          : ''
      }

    </div>
  )
}

export default App