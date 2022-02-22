import React, { useState } from 'react'

function Single({ blog, handleLike }) {
	const [detailsShown, setDetailsShown] = useState(false)
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}

	const handleView = () => {
		setDetailsShown(!detailsShown)
	}

	const blogDetails = ({ url, likes, user }) => (
		<>
			<br />
			{url}
			<br />
			{`likes ${likes}`}
			<button
				type="button"
				onClick={() => { handleLike(blog) }}
			>
				Like
			</button>
			<br />
			{`Added by ${user.name}`}
		</>
	)

	return (
		<div style={blogStyle}>
			{`${blog.title} - ${blog.author}`}
			<button
				type="button"
				onClick={handleView}
			>
				{(detailsShown) ? 'Hide' : 'Show'}
			</button>
			{(detailsShown) && blogDetails(blog)}
		</div>
	)
}

export default Single
