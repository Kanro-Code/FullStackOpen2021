import React, { useState, useEffect } from 'react'
import blogService from '../../services/blogs'
import New from './New'
import Single from './Single'

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

	return (
		<div>
			<New handleNewBlog={handleNewBlog} />
			{blogs.map((b) => (
				<Single key={b.id} blog={b} />
			))}
		</div>
	)
}

export default Blogs
