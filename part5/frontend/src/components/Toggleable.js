import React, { useState, useImperativeHandle } from 'react'

const Toggleable = React.forwardRef((props, ref) => {
	console.log(props.state)
	const [visible, setVisible] = useState(props.state)

	const hideWhenVisible = { display: (visible) ? 'none' : '' }
	const showWhenVisible = { display: (visible) ? '' : 'none' }

	const toggleVisible = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, toggleVisible)

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisible}>{props.label}</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<button onClick={toggleVisible}>Cancel</button>
			</div>
		</div>
	)
})

export default Toggleable
