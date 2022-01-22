import React from 'react'

const Notifications = ({notification}) => {
  const {message, type} = notification 
  return(
    (!message)
    ? null
    : <div className={type}>
      {message}
    </div>
  )
}


export default Notifications