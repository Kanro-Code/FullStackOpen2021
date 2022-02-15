import React, { useState } from 'react'
import Input from '../formElements/Input'

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
			<Input
				name="username"
				type="text"
				value={username}
				setter={setUsername}
			/>
			<Input
				name="password"
				type="password"
				value={password}
				setter={setPassword}
			/>
			<button type="submit">Login</button>
		</form>
	)
}

export default Form
