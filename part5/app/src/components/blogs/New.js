import React, { useState } from 'react'

function New({ handleNewBlog }) {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		handleNewBlog({
			title,
			author,
			url,
		})
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<form onSubmit={handleSubmit}>
			Title:
			<input
				type="text"
				value={title}
				onChange={({ target }) => setTitle(target.value)}
				placeholder="Title"
			/>
			<br />

			Author:
			<input
				type="text"
				value={author}
				onChange={({ target }) => setAuthor(target.value)}
				placeholder="Author"
			/>
			<br />

			Url:
			<input
				type="text"
				value={url}
				onChange={({ target }) => setUrl(target.value)}
				placeholder="Url"
			/>
			<br />
			<button type="submit">
				Create
			</button>
		</form>
	)
}

export default New
