import React from 'react'

const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
			{
				name: 'Fundamentals of React',
				excercises: 10
			} ,
			{
				name: 'Using props to pass data',
				excercises: 7
			},
			{
				name: 'State of a component',
				excercises: 14
			} 
		]
	}



	return (
		<div>
			<Header course={course} />
			<Content parts={parts} />
			<Total total={parts} />
		</div>
	)
}

const Header = (props) => {
	return (
		<h1>{props.course}</h1>
	)
}

const Content = (props) => {
	return (<div>
		<Part part={props.part1} exercises={props.exercises1} />
		<Part part={props.part2} exercises={props.exercises2} />
		<Part part={props.part3} exercises={props.exercises3} /></div>
	)
}

const Part = (props) => {
	return (
		<p>
			{props.part} {props.exercises}
		</p>
	)
}

const Total = (props) => {
	return (
		<p>Number of exercises {props.total}</p>
	)
}

export default App