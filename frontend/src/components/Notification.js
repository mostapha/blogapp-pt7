import { useEffect } from 'react'
import { Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'

const NOTIFICATION_TIMEOUT_SECONDS = 5

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(s => s.notification)

  useEffect(() => {
    if(notification !== ''){
      let timeout = setTimeout(() => {
        dispatch(clearNotification())
      }, NOTIFICATION_TIMEOUT_SECONDS * 1000)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [notification])

  if(notification === ''){
    return ''
  }

  return  (
    <Alert variant='secondary'>{notification}</Alert>
  )
}

export default Notification