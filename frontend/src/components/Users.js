import { useEffect, useState } from 'react'
import usersApi from '../services/users'
const UsersView = () => {
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
          <tr>
            <th>name</th><th>blogs created</th>
          </tr>
          {users.map(user => (
            <tr key={user.id}><td>{user.name}</td><td>{user.blogs.length}</td></tr>
          ))}
        </table>
      )}
    </>
  )
}

export default UsersView