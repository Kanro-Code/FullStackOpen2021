import React, { useState } from 'react'
import Button from '../formElements/Button'

function Blog(props) {
	const { blog, handleDelete, handleLike, user } = props
	const [viewDetails, setViewDetails] = useState(false)

	const toggleView = () => {
		setViewDetails(!viewDetails)
	}

	const clickDelete = (id) => {
		// eslint-disable-next-line no-alert
		if (window.confirm('Are you sure you want to delete this blog?')) {
			handleDelete(id)
		}
	}

	const userOwnsBlog = (blog.user.id === user.id)

	const style = {
		padding: '10px',
		border: '1px solid black',
	}

	const details = (n) => (
		<div>
			{n.url}
			<br />
			{`likes: ${n.likes}`}
			<Button text="like" func={() => handleLike(n.id)} />

			{(userOwnsBlog)
			&& <Button text="delete" func={() => clickDelete(n.id)} />}
		</div>
	)

	return (
		<div style={style}>
			{`${blog.title} - ${blog.author}`}
			<button onClick={toggleView} type="button">
				{(viewDetails) ? 'hide' : 'show'}
			</button>
			<br />
			{(viewDetails) && details(blog)}
		</div>
	)
}

export default Blog
