import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'

const NotifcationStyle = {
  background: '#eae1f9',
  padding: '13px 15px',
  margin: '15px 0',
  borderRadius: '3px'
}

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(s => s.notification)

  useEffect(() => {
    if(notification !== ''){
      let timeout = setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [notification])

  if(notification === ''){
    return ''
  }

  return <div style={NotifcationStyle}>{notification}</div>
}

export default Notification