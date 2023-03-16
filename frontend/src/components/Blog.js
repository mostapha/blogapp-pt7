import { useState } from 'react'
import PropTypes from 'prop-types'

const blogStyle = { marginBottom: '15px', padding: '10px', border: '1px solid #f09fff' }

const Blog = ({ blog, user, handleRemove, handleLikeClick }) => {
  const [expanded, setExpanded] = useState(false)

  const detailsStyle = {
    display: expanded ? '' : 'none'
  }
  const toggleText = expanded ? 'hide' : 'view'


  const toggleVisibility = () => setExpanded(!expanded)

  return (
    <li className='blog' style={blogStyle}>
      {`${blog.title} by ${blog.author}`} <button onClick={() => toggleVisibility()}>{toggleText}</button>

      {
        expanded
          ?
          <div style={detailsStyle}>
            <div>{blog.url}</div>
            <div>likes: {blog.likes} <button onClick={() => handleLikeClick(blog)}>like</button></div>
            <div>{blog.user.name}</div>
            {blog.user.username === user.username ? <button onClick={() => handleRemove(blog)}>remove</button> : ''}
          </div>
          : ''
      }

    </li>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog