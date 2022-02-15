import React from 'react'
import Button from '../formElements/Button'

function Welcome({ handleLogout, user }) {
	return (
		<p>
			{`Welcome ${user.name}`}
			<Button text="Logout" func={() => handleLogout()} />
		</p>
	)
}
export default Welcome
