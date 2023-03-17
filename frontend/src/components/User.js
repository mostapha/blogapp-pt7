import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import usersApi from '../services/users'
const User = () => {
  const userId = useParams().id
  const [user, setUser] = useState(null)

  console.log('userId', userId)
  useEffect(() => {
    usersApi.getUser(userId).then(user => {
      console.log('user', user)
      setUser(user)
    })
  }, [])

  if(user === null){
    return <div>Loading...</div>
  }

  return (
    <>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {
          user.blogs.map(blog => (
            <li key={blog.id}>{blog.title}</li>
          ))
        }
      </ul>

    </>
  )
}

export default User