import { useEffect, useState } from 'react'
import  service  from '../services/blogs'

const CommentsHeader = () => (
  <h3>Comments</h3>
)

const AddComment = ({ blogId, commentsState }) => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = commentsState

  const submit = async event => {
    event.preventDefault()
    const addedComment = await service.postBlogComment(blogId, comment)
    setComment('')
    setComments(
      comments.concat(addedComment)
    )
  }

  return (
    <>
      <form onSubmit={submit}>
        <input required type='text' placeholder='comment content...' value={comment} onChange={(event) => setComment(event.target.value)}/>
        <button>add comment</button>
      </form>
    </>
  )
}

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

  return (
    <>
      <CommentsHeader/>
      <AddComment blogId={blogId} commentsState={[comments, setComments]}/>
      {
        comments.length === 0 ? (
          <>
            <CommentsHeader/>
            <p>No comments on this blog</p>
          </>
        ) : (
          <ul>
            {
              comments.map(comment => (
                <li key={comment.id}>{comment.content}</li>
              ))
            }
          </ul>
        )
      }

    </>
  )
}

export default Comments