import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import usersApi from '../services/users'
const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    usersApi.getUsers().then(users => {
      console.log('users', users)
      setUsers(users)
    })
  }, [])

  return (
    <>
      <h2>Users</h2>
      {users.length === 0 ? <div>Loading...</div> : (
        <table>
          <thead>
            <tr>
              <th>name</th><th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Users