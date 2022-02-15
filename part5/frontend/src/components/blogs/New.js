import React, { useState } from 'react'
import Input from '../formElements/Input'

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

	return (
		<form onSubmit={handleSubmit}>
			<h3>Add a new blog</h3>
			<Input
				name="title"
				type="text"
				value={title}
				setter={setTitle}
			/>
			<Input
				name="author"
				type="text"
				value={author}
				setter={setAuthor}
			/>
			<Input
				name="url"
				type="text"
				value={url}
				setter={setUrl}
			/>
			<button type="submit">Add new</button>
		</form>
	)
}

export default New
