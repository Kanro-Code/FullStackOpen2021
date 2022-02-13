import React from 'react'

const Input = ({ name, type, value, setter }) => (
	<div>
		{name}:
		<input
			name={name}
			type={type}
			value={value}
			onChange={({ target }) => setter(target.value)}
		/>
	</div>
)

export default Input