import { useState, forwardRef, useImperativeHandle } from 'react'

const Toggleable = forwardRef((props, ref) => {
	const [visible, setVisible] = useState(props.state)

	const hideWhenVisible = { display: (visible) ? 'none' : '' }
	const showWhenVisible = { display: (visible) ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}


	useImperativeHandle(ref, () => {   
		return {      
			toggleVisibility    
		}  
	})

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{props.label}</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<button onClick={toggleVisibility}>Cancel</button>
			</div>
		</div>
	)
})

export default Toggleable
