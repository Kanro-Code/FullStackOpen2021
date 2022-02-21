import React, { useState } from 'react'
import Blogs from './components/blogs/index'
import Login from './components/Login'
import Notification from './components/Notification'

function App() {
	const [notification, setNotification] = useState({})

	const addNotification = (type, message) => {
		setNotification({
			type, message,
		})
	}

	return (
		<div>
			<h2>Blogs</h2>
			<Notification notification={notification} />
			<Login addNotification={addNotification} />
			<h2>blogs</h2>
			<Blogs addNotification={addNotification} />
		</div>
	)
}

export default App
