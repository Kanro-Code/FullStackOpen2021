import React from 'react'

function Input({ name, type, value, setter }) {
	return (
		<div>
			{`${name}:`}
			<input
				name={name}
				type={type}
				value={value}
				onChange={({ target }) => setter(target.value)}
			/>
		</div>
	)
}

export default Input
