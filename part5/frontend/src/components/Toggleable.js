import React, { useState, forwardRef, useImperativeHandle } from 'react'

const Toggleable = forwardRef((props, ref) => {
	const [visible, setVisible] = useState(props.state)
	setVisible(true)

	const hideWhenVisible = { display: (visible) ? 'none' : '' }
	const showWhenVisible = { display: (visible) ? '' : 'none' }

	const toggleVisibility = () => {
		console.log('hi??')
		// setVisible(!visible)
	}

	useImperativeHandle(ref, toggleVisibility)

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility} type="button">
					{props.label}
				</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<br />
				<button onClick={toggleVisibility} type="button">
					Cancel
				</button>
			</div>
		</div>
	)
})

Toggleable.displayName = 'Toggleable'
export default Toggleable
