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

export default Notification
