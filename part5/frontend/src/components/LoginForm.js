import React, { useState } from 'react'
import loginService  from '../services/login'

const LoginForm = ({setUser}) => {
	const [username, setUsername] = useState()
	const [password, setPassword] = useState()

	const handleSubmit = async (e) => {
		e.preventDefault()

		const token = await loginService.login(username, password)
		console.log(token)
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

export default LoginForm
