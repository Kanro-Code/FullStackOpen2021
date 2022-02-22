import PropTypes from 'prop-types'

function Notification({ notification }) {
	const { type, message } = notification

	return (message)
		? (
			<div className={type}>
				<br />
				<em>{message}</em>
			</div>
		)
		: null
}

Notification.propTypes = {
	notification: PropTypes.shape({
		type: PropTypes.string.isRequired,
		message: PropTypes.string.isRequired,
	}).isRequired,
}

export default Notification
