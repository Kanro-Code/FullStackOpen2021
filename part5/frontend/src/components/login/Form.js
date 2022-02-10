import React, { useState } from 'react'

const Form = ({ handleLogin }) => {
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
			<div>
				Username: 
				<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/ >
			</div>
			<div>
				Password:
				<input
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/ >
			</div>
			<button type='submit'>Login</button>
		</form>
	)

}

export default Form