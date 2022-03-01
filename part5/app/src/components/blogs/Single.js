import React, { useState } from 'react'
import PropTypes from 'prop-types'

function Single({
	blog,
	handleLike,
	handleDelete,
	user,
}) {
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

	const confirmDelete = () => {
		// eslint-disable-next-line no-alert
		if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
			handleDelete(blog)
		}
	}

	const blogDetails = ({ url, likes }) => (
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
			{`Added by ${blog.user.name}`}
			{(user.username === blog.user.username) && (
				<button
					type="button"
					onClick={() => confirmDelete()}
				>
					Delete
				</button>
			)}
		</>
	)

	return (
		<div style={blogStyle}>
			{`${blog.title} - ${blog.author}`}
			<button
				type="button"
				onClick={handleView}
				className="showDetails"
			>
				{(detailsShown) ? 'Hide' : 'Show'}
			</button>
			{(detailsShown) && blogDetails(blog)}

		</div>
	)
}

Single.propTypes = {
	blog: PropTypes.shape({
		title: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired,
		author: PropTypes.string.isRequired,
		user: PropTypes.shape({
			username: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired,
		}),
	}).isRequired,
	handleLike: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired,
}

export default Single
