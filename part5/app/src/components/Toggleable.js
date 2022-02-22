import { useState } from 'react'
import PropTypes from 'prop-types'

function Toggleable({ buttonLabel, children }) {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: (visible) ? 'none' : '' }
	const shownWhenVisible = { display: (visible) ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

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
}

Toggleable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
}

export default Toggleable
