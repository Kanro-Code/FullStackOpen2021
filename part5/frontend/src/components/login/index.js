import React from 'react'
import Form from './Form'
import Welcome from './Welcome'

function LoginForm({ user, handleLogin, handleLogout }) {
	return (
		(user)
			? <Welcome handleLogout={handleLogout} user={user} />
			: <Form handleLogin={handleLogin} />
	)
}
export default LoginForm
