import React, { useState } from 'react'

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	
	return (
		<div>
			<h1>feedback</h1>
			<Button text="good" action={() => setGood(good + 1)} />
			<Button text="neutral" action={() => setNeutral(neutral + 1)} />
			<Button text="bad" action={() => setBad(bad + 1)} />

			<h1>statistics</h1>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	)
}

const Statistics = ({good, neutral, bad}) => {
	if (good + neutral + bad > 0) {
		return (
			<table>
				<tbody>
					<StatisticLine text="good" value={good} />
					<StatisticLine text="neutral" value={neutral} />
					<StatisticLine text="bad" value={bad} />
					<StatisticLine text="average" value={(good - bad) / (good + neutral + bad)} />
					<StatisticLine text="positive" value={good/(good + neutral + bad)*100 + "%"} />
				</tbody>
			</table>
		)
	} else {
		return (
			<div>
				No feedback given
			</div>
		)
	}
}

const StatisticLine = ({text, value}) => (
	<tr>
		<td>{text}</td>
		<td>{value}</td>
	</tr>
)

const Button = ({text, action}) => (
	<button onClick={action}>{text}</button>
)
	
export default App
