import React from 'react'
import Toggleable from '../Toggleable'

const Blog = ({ blog, handleDelete }) => {
	const style = {
		padding: '10px',
		border: '1px solid black'
	}
	return (
		<div style={style}>
			{blog.title} - {blog.author}<br />
			<Toggleable label="show">
				{blog.url}<br />
				likes: {blog.likes} <button>like</button><br />

				<button onClick={() => handleDelete(blog.id)}>Delete</button>
			</Toggleable>
		</div>
	)
}

export default Blog
