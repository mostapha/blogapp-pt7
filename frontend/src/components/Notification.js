import { useEffect } from 'react'
import PropTypes from 'prop-types'

const NotifcationStyle = {
  background: '#eae1f9',
  padding: '13px 15px',
  margin: '15px 0',
  borderRadius: '3px'
}

const Notification = ({ setNotification, notification }) => {
  useEffect(() => {
    if(notification === '') return
    let timeout = setTimeout(() => {
      setNotification('')
    }, 5000)
    return () => {
      clearTimeout(timeout)
    }
  }, [notification])

  if(notification === ''){
    return ''
  }

  return <div style={NotifcationStyle}>{notification}</div>
}

Notification.propTypes = {
  setNotification: PropTypes.func.isRequired,
  notification: PropTypes.string.isRequired
}

export default Notification