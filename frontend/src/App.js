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

import { Button, Container, Nav, Navbar } from 'react-bootstrap'



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
      <Navbar expand="lg" bg="dark" variant="dark" className='mb-3'>
        <Container>
          <Link className='navbar-brand' to={'/'}>Blog App</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className='nav-link' to={'/'} role="button" tabIndex="0">Blogs</Link>
              <Link className='nav-link' to={'/users'} role="button" tabIndex="0">Users</Link>
            </Nav>
            <div className='text-white'>{user.name} logged in<Button className='ms-2' variant="light" onClick={logout} size="sm">logout</Button></div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <div className='container'>
          <Notification/>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User/>} />
            <Route path="/blogs/:id" element={<SingleBlog/>} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App