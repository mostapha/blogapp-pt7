import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import { clearUserAction, setUserAction } from './reducers/userReducer'
import loginService from './services/login'
import storageService from './services/storage'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import Homepage from './components/Homepage'
import User from './components/User'
import SingleBlog from './components/SingleBlog'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(s => s.user)

  useEffect(() => {
    const user = storageService.loadUser()
    dispatch(setUserAction(user))
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
      dispatch(setUserAction(loginRes))
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
    dispatch(clearUserAction(null))
    storageService.removeUser()
    notify('user logged out')
  }

  return (
    <Router>
      <div>
        <h2>blogs</h2>
        <nav style={{ display: 'flex', gap: '10px' }}>
          <Link to={'/'}>Home</Link>
          <Link to={'/users'}>Users</Link>
        </nav>
        <Notification/>
        <p>User {user.name} is logged in. <button onClick={logout}>logout</button></p>

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User/>} />
          <Route path="/blogs/:id" element={<SingleBlog/>} />
        </Routes>

      </div>
    </Router>
  )
}

export default App