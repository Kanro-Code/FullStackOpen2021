import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'

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

	return (
		<div>
			{blogs.map((b) => (
				<Blog key={b.id} blog={b} />
			))}
		</div>
	)
}

export default Blogs
