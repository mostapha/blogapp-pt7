import { useEffect, useState } from 'react'
import  service  from '../services/blogs'

const CommentsHeader = () => (
  <h3>Comments</h3>
)
const Comments = ({ blogId }) => {
  const [comments, setComments] = useState(null)
  useEffect(() => {
    service.getBlogComments(blogId).then(comments => {
      setComments(comments)
    })
  }, [])

  if(comments === null){
    return (
      <>
        <CommentsHeader/>
        <p>Loading...</p>
      </>
    )
  }

  if(comments.length === 0){
    return (
      <>
        <CommentsHeader/>
        <p>No comments on this blog</p>
      </>
    )
  }

  return (
    <>
      <CommentsHeader/>
      <ul>
        {
          comments.map(comment => (
            <li key={comment.id}>{comment.content}</li>
          ))
        }
      </ul>
    </>
  )
}

export default Comments