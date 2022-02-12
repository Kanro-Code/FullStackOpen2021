import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/blogs/index'
import Login from './components/login/index'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)

	const formToggleRef = useRef()

	useEffect(async () => {
		const blogList = await blogService.getAll()
		setBlogs(blogList)
	}, [])
	
	useEffect(() => {
		const authUser = window.localStorage.getItem('authUser')

		if (authUser) {
			const user = JSON.parse(authUser)
			setUser(user)
		}
	}, [])

	const handleLogin = async (username, password) => {
		const user = await loginService.login(username, password)
		setUser(user)
		const userJSON = JSON.stringify(user)
		window.localStorage.setItem('authUser', userJSON)
		return user
	}

	const handleLogout = () => {
		setUser(null)
		window.localStorage.setItem('authUser', null)
	}

	const handleDelete = async (id) => {
		const success = await blogService.deleteOne(id, user.token)
		if (success) {
			const newBlogs = blogs.filter(n => n.id !== id)
			setBlogs(newBlogs)
		}
	}

	const handleNewBlog = async (newBlog) => {
		console.log(formToggleRef)

		const blog = await blogService.addNew(newBlog, user.token)
		setBlogs([...blogs, blog])
		formToggleRef.current.toggleVisibility()

		return blog
	}

	return (
		<div>
			<h2>blogs</h2>
			<Login 
				handleLogin={handleLogin}
				handleLogout={handleLogout} 
				user={user} 
			/>
			{ (user !== null) && <Blogs 
				blogs={blogs} 
				handleNewBlog={handleNewBlog} 
				handleDelete={handleDelete}
				ref={formToggleRef}
			/> }
		</div>
	)
}

export default App