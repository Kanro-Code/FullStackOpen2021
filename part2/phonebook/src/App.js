import React, {useState, useEffect} from 'react'
import Numbers from './services/Numbers'

const App = () => {
	const [numbers, setNumbers] = useState([])
	const [filter, setFilter] = useState('')

	useEffect(() => 
		Numbers.getAll()
			.then(res => setNumbers(res))
	)

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filter={filter} setFilter={setFilter} />
			<NumberAdd numbers={numbers} setNumbers={setNumbers} />
			<NumberList numbers={numbers} />
		</div>
	)
}

const Filter = ({filter, setFilter}) => {
	const handleChange = (e) => setFilter(e.target.value)
	return (
		<input value={filter} onChange={handleChange} />
	)
}

const NumberAdd = ({numbers, setNumbers}) => {
	const [name, setName] = useState('')
	const [number, setNumber] = useState('')

	const handleName = (e) => setName(e.target.value)
	const handleNumber = (e) => setNumber(e.target.value)
	const handleSubmit = (e) => {
		e.preventDefault()
		
		(numbers.filter(p => p.name == name))
			? alert(`${name} is already added to the phonebook`)
			: Numbers.create({name, number})
				.then(() => {
					setName('')
					setNumber('')
				})
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>Add a new</h2>
			name: <input value={name} onChange={handleName} /> <br />
			number: <input value={number} onChange={handleNumber} /> <br />
			<button type="submit">add</button>
		</form>
	)
}

const NumberList = ({numbers}) => (
	<div>
		<h2>Numbers</h2>
		<ul>
			{numbers.map(p => 
				<NumberListItem key={p.id} person={p} />
			)}
		</ul>
	</div>
)

const NumberListItem = ({person}) => (
	<li>{person.name} {person.number}</li>
)

export default App