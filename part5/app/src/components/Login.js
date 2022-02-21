import React, { useEffect, useState } from 'react'
import BlogService from '../services/blogs'
import LoginService from '../services/login'

function Login({ addNotification }) {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	useEffect(() => {
		const loggedUserJSON = window.localStorage
			.getItem('loggedUser')

		if (loggedUserJSON !== null) {
			const loggedUser = JSON.parse(loggedUserJSON)
			BlogService.setToken(loggedUser.token)
			setUser(loggedUser)
		}
	}, [])

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
			BlogService.setToken(loggedUser.token)

			window.localStorage.setItem(
				'loggedUser',
				JSON.stringify(loggedUser),
			)
		} catch (err) {
			console.error(err)
			addNotification('error', 'Wrong username or password')
		}
	}

	const handleLogout = () => {
		console.log('Logging out')
		setUser(null)
		BlogService.setToken(null)
		window.localStorage.removeItem('loggedUser')
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
				<button
					type="button"
					onClick={handleLogout}
				>
					Logout
				</button>
			</div>
		)
}

export default Login
