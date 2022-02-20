import React, { useState } from 'react'

function New({ handleNewBlog }) {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	return (
		<form onSubmit={handleNewBlog}>
			Title:
			<input
				type="text"
				value={title}
				onChange={({ target }) => setTitle(target.value)}
			/>
			<br />

			Title:
			<input
				type="text"
				value={author}
				onChange={({ target }) => setAuthor(target.value)}
			/>
			<br />

			Url:
			<input
				type="text"
				value={url}
				onChange={({ target }) => setUrl(target.value)}
			/>
			<br />
		</form>
	)
}

export default New
