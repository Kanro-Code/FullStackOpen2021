import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import loginService from '../services/login'

function Login({ addNotification, user, setUser }) {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		const loggedUserJSON = window.localStorage
			.getItem('loggedUser')

		if (loggedUserJSON !== null) {
			const loggedUser = JSON.parse(loggedUserJSON)
			blogService.setToken(loggedUser.token)
			setUser(loggedUser)
		}
	}, [setUser])

	const handleLogin = async (e) => {
		e.preventDefault()
		console.log(`Logging in with ${username}-${password}`)

		try {
			const loggedUser = await loginService.login({
				username, password,
			})
			setUsername('')
			setPassword('')

			setUser(loggedUser)
			blogService.setToken(loggedUser.token)

			window.localStorage.setItem(
				'loggedUser',
				JSON.stringify(loggedUser),
			)

			addNotification('succes', `${loggedUser.username} logged in!`)
		} catch (err) {
			console.error(err)
			addNotification('error', 'Wrong username or password')
		}
	}

	const handleLogout = () => {
		setUser(null)
		blogService.setToken(null)
		window.localStorage.removeItem('loggedUser')

		addNotification('succes', 'Logged out!')
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

Login.propTypes = {
	addNotification: PropTypes.func.isRequired,
	setUser: PropTypes.func.isRequired,
}

export default Login
