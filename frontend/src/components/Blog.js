import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const blogStyle = { marginBottom: '15px', padding: '10px', border: '1px solid #f09fff' }

const Blog = ({ blog }) => {
  return (
    <li className='blog' style={blogStyle}>
      <Link to={'/blogs/' + blog.id}>{`${blog.title} by ${blog.author}`}</Link>
    </li>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog