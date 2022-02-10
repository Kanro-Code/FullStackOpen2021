import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/login/index'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)

	useEffect(() => {
		blogService.getAll().then((b) =>
			setBlogs(b)
		)	
	}, [])
	
	useEffect(() => {
		const authUser = window.localStorage.getItem('authUser')

		if (authUser) {
			const user = JSON.parse(authUser)
			setUser(user)
		}
	}, [])

	const handleLogin = async (username, password) => {
		try {
			const user = await loginService.login(username, password)
			setUser(user)
			const userJSON = JSON.stringify(user)
			window.localStorage.setItem('authUser', userJSON)
			console.log(user)
			return true
		} catch(e) {
			console.error(e)
		}
	}

	const handleLogout = () => {
		console.log('Hi?')
		setUser(null)
		window.localStorage.setItem('authUser', null)
	}

	return (
		<div>
			<h2>blogs</h2>
			<Login 
				handleLogin={handleLogin}
				handleLogout={handleLogout} 
				user={user} 
			/>
			{ (user) && <Blogs blogs={blogs} />}
		</div>
	)
}

export default App