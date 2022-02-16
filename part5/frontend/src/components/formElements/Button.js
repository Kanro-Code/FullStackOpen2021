import React from 'react'

function Button({ text, func }) {
	return (
		<Button type="type" onClick={func}>
			{text}
		</Button>
	)
}

export default Button
