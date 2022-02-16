import React, { useState } from 'react'

function New({ handleNewBlog }) {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()
		const newBlog = {
			title,
			author,
			url,
		}
		const success = await handleNewBlog(newBlog)
		if (success) {
			setTitle('')
			setAuthor('')
			setUrl('')
		}
	}

	const input = (name, value, setter) => (
		<div>
			{`${name}: `}
			<input
				name={name}
				type="text"
				value={value}
				onChange={({ target }) => setter(target.value)}
			/>
		</div>
	)

	return (
		<form onSubmit={handleSubmit}>
			<h3>Add a new blog</h3>
			{input('title', title, setTitle)}
			{input('author', author, setAuthor)}
			{input('url', url, setUrl)}
			<button type="submit">Add new</button>
		</form>
	)
}

export default New