import React from 'react'

const Welcome = ({ handleLogout, user }) => (
	<p>
		Welcome {user.name}
		<button onClick={() => handleLogout()}>Logout</button>
	</p>
)

export default Welcome
