import React, { useState, useEffect } from 'react'
import blogService from '../../services/blogs'
import New from './New'
import Single from './Single'

function Blogs() {
	const [blogs, setBlogs] = useState([])

	useEffect(() => {
		const fetch = async () => {
			const fetchedBlogs = await blogService.getAll()
			setBlogs(fetchedBlogs)
		}
		fetch()
			.catch((e) => console.log(e))
	}, [])

	const handleNewBlog = (blog) => {
		console.log(blog)
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
