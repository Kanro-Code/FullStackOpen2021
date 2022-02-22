import React, { useState, useEffect } from 'react'
import blogService from '../../services/blogs'
import New from './New'
import Single from './Single'
import Toggleable from '../Toggleable'

function Blogs({ addNotification }) {
	const [blogs, setBlogs] = useState([])

	useEffect(() => {
		const fetch = async () => {
			const fetchedBlogs = await blogService.getAll()
			setBlogs(fetchedBlogs)
		}
		try {
			fetch()
		} catch (e) {
			console.error(e)
		}
	}, [])

	const handleNewBlog = async (blog) => {
		try {
			const newBlog = await blogService.create(blog)
			setBlogs([...blogs, newBlog])
			addNotification('succes', `New Blog: ${newBlog.title} by ${newBlog.author}`)
		} catch (e) {
			console.log('Something went wrong adding a blog', e)
			addNotification('error', e.message)
		}
	}

	const handleLike = async (blog) => {
		const likedBlog = await blogService.like(blog.id)
		const newBlogs = blogs.filter((b) => b.id !== likedBlog.id)
		setBlogs([...newBlogs, likedBlog])
	}

	const sortByLike = () => blogs.sort(
		(a, b) => a.likes < b.likes,
	)

	return (
		<div>
			<Toggleable buttonLabel="Create new">
				<h2>Create a new blog</h2>
				<New handleNewBlog={handleNewBlog} />
			</Toggleable>
			<br />
			{sortByLike().map((b) => (
				<Single
					key={b.id}
					blog={b}
					handleLike={handleLike}
				/>
			))}
		</div>
	)
}

export default Blogs
