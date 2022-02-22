import React, { useState } from 'react'
import Blogs from './components/blogs/index'
import Login from './components/Login'
import Notification from './components/Notification'

function App() {
	const [notification, setNotification] = useState({})
	const [user, setUser] = useState(null)

	const addNotification = (type, message) => {
		setNotification({
			type, message,
		})
		setTimeout(() => setNotification(''), 5000)
	}

	return (
		<div>
			<h2>Blogs</h2>
			<Notification notification={notification} />
			<Login
				addNotification={addNotification}
				user={user}
				setUser={setUser}
			/>
			{(user) && (
				<Blogs
					addNotification={addNotification}
					user={user}
				/>
			)}
		</div>
	)
}

export default App
