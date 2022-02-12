import React, { useState } from 'react'

const Blog = ({ blog, handleDelete, handleLike }) => {
	const [viewDetails, setViewDetails] = useState(false)

	const toggleView = () => {
		setViewDetails(!viewDetails)
	}

	const clickDelete = (id) => {
		if (window.confirm('Are you sure you want to delete this blog?')) {
			handleDelete(id)
		}
	}

	const style = {
		padding: '10px',
		border: '1px solid black'
	}
	return (
		<div style={style}>
			{blog.title} - {blog.author}
			<button onClick={toggleView}>
				{(viewDetails) ? 'hide' : 'show'}
			</button>
			<br/>
			{(viewDetails) && 
				<>
					{blog.url} <br />
					likes: {blog.likes} 
					<button onClick={() => handleLike(blog.id)}>like</button>
					<br />
					<button onClick={() => clickDelete(blog.id)}>Delete</button>
				</>
			}
		</div>
	)
}

export default Blog
