import PropTypes from 'prop-types'
import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// const blogStyle = { marginBottom: '15px', padding: '10px', border: '1px solid #f09fff' }

const Blog = ({ blog }) => {
  return (
    <ListGroup.Item>
      <Link
        to={'/blogs/' + blog.id}
        style={{ textDecoration: 'none' }}
      >{`${blog.title} by ${blog.author}`}</Link>
    </ListGroup.Item>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog