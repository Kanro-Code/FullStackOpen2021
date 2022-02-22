import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggleable = forwardRef((props, ref) => {
	const { buttonLabel, children } = props

	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: (visible) ? 'none' : '' }
	const shownWhenVisible = { display: (visible) ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => ({ toggleVisibility }))

	return (
		<div>
			<div style={hideWhenVisible}>
				<button
					type="button"
					onClick={toggleVisibility}
				>
					{buttonLabel || 'Show'}
				</button>
			</div>
			<div style={shownWhenVisible}>
				{children}
				<button
					type="button"
					onClick={toggleVisibility}
				>
					Cancel
				</button>
			</div>
		</div>
	)
})

Toggleable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
}

export default Toggleable
