import React from 'react'
const Blog = ({ blog, handleDelete }) => (
	<li>
		{blog.title} - {blog.author}
		<button onClick={() => handleDelete(blog.id)}>Delete</button>
	</li>
)

export default Blog
