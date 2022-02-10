import React, { useState } from 'react'
import Form from './Form'
import Welcome from './Welcome'


const LoginForm = ({ user, handleLogin, handleLogout }) => (
	(user)
		? <Welcome handleLogout={handleLogout} user={user} />
		: <Form handleLogin={handleLogin} />
)

export default LoginForm
