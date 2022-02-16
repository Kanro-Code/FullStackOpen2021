import React, { useState } from 'react'

function Form({ handleLogin }) {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (await handleLogin(username, password)) {
			setUsername('')
			setPassword('')
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			Username:
			<input
				type="text"
				value={username}
				onChange={({ target }) => setUsername(target.value)}
			/>
			<input
				type="text"
				value={password}
				onChange={({ target }) => setPassword(target.value)}
			/>
			<button type="submit">Login</button>
		</form>
	)
}

export default Form
