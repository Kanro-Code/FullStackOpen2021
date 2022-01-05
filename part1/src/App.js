import React from 'react'
const Hello = (props) => {
	return (
		<div>
			<p>Hello World! { props.name }</p>
		</div>
	)
}

const App = () => {
	return (
		<div>
			<h1>Greetings</h1>
			<Hello name="Thijs"/>
			<Hello name="Thijs 2"/>
			<Hello name="Thijs 3"/>
		</div>
	)
}
export default App