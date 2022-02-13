import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/blogs/index'
import Login from './components/login/index'
import blogService from './services/blogs'
import loginService from './services/login'

function App() {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)

	const formToggleRef = useRef()

	useEffect(() => {
		async function func() {
			const blogList = await blogService.getAll()
			setBlogs(blogList)
		}
		func()
	})

	useEffect(() => {
		const authUser = window.localStorage.getItem('authUser')

		if (authUser) {
			const parsedUser = JSON.parse(authUser)
			setUser(parsedUser)
		}
	}, [])

	const handleLogin = async (username, password) => {
		const loggedUser = await loginService.login(username, password)
		setUser(loggedUser)

		const userJSON = JSON.stringify(loggedUser)
		window.localStorage.setItem('authUser', userJSON)
		return loggedUser
	}

	const handleLogout = () => {
		setUser(null)
		window.localStorage.setItem('authUser', null)
	}

	const handleDelete = async (id) => {
		const success = await blogService.deleteOne(id, user.token)
		if (success) {
			const newBlogs = blogs.filter((n) => n.id !== id)
			setBlogs(newBlogs)
		}
	}

	const handleNewBlog = async (newBlog) => {
		try {
			const blog = await blogService.addNew(newBlog, user.token)

			setBlogs([...blogs, blog])
			formToggleRef.current.toggleVisibility()

			return blog
		} catch (e) {
			console.error(e)
			return null
		}
	}

	const handleLike = async (id) => {
		const blog = await blogService.like(id)
		const newBlogs = blogs.map((b) => ((b.id !== blog.id) ? b : blog))
		setBlogs(newBlogs)
	}

	const sortBlogs = () => (
		blogs.sort((a, b) => a.likes < b.likes)
	)

	return (
		<div>
			<h2>blogs</h2>
			<Login
				handleLogin={handleLogin}
				handleLogout={handleLogout}
				user={user}
			/>
			{ (user !== null) && (
				<Blogs
					blogs={sortBlogs()}
					handleNewBlog={handleNewBlog}
					handleDelete={handleDelete}
					handleLike={handleLike}
					ref={formToggleRef}
					user={user}
				/>
			) }
		</div>
	)
}

export default App
