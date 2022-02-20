import React, { useState } from 'react'
import LoginService from '../services/login'

function Login() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	const handleLogin = async (e) => {
		e.preventDefault()
		console.log(`Logging in with ${username}-${password}`)

		try {
			const loggedUser = await LoginService.login({
				username, password,
			})
			setUsername('')
			setPassword('')
			setUser(loggedUser)

			console.log(loggedUser)
		} catch (err) {
			console.error(err)
		}
	}

	return (user === null)
		? (
			<form onSubmit={handleLogin}>
				<h2>Log in to application</h2>
				<div>
					Username:
					<input
						type="text"
						value={username}
						name="username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					Password:
					<input
						type="password"
						value={password}
						name="password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">Login</button>
			</form>
		)
		: (
			<div>
				{`${user.name} logged in`}
			</div>
		)
}

export default Login
