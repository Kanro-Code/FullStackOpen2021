import React, {useState, useEffect} from 'react'
import Numbers from './services/Numbers'

const App = () => {
	const [numbers, setNumbers] = useState([])
	const [filter, setFilter] = useState('')

	const numbersFilter = () => numbers.filter(n => n.name.includes(filter))

	useEffect(() => 
		Numbers
			.getAll()
			.then(res => {
				console.log("Fetching all Numbers", res)
				setNumbers(res)})
	, [])

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filter={filter} setFilter={setFilter} />
			<NumberAdd numbers={numbers} setNumbers={setNumbers} />
			<NumberList numbers={numbersFilter()} setNumbers={setNumbers} />
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
		const existing = numbers.find(n => n.name === name)

		if (existing) {
			updateExisting({...existing, number: number})
				.then(res =>  {
					setNumbers(numbers.map(n => n.id !== res.id ? n : res ))
					setName('')
					setNumber('')
				})
		} else {
			Numbers
				.create({name, number})
				.then(n => {
					setNumbers([...numbers, n])
					setName('')
					setNumber('')
				})
		}
	}

	const updateExisting = (person) => {
		const message = `${person.name} is already added to the phonebook, `+
		`replace the older number with a new one?`
		if (window.confirm(message)) {
			return Numbers
				.update(person.id, person)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>Add a new</h2>
			name: <input value={name} onChange={handleName} /> <br />
			number: <input value={number} onChange={handleNumber} /> <br />
			<button type="submit">save</button>
		</form>
	)
}

const NumberList = ({numbers, setNumbers}) => {
	const handleDelete = ({name, id}) => {
		if (!window.confirm(`Delete ${name} ?`)) return
		Numbers
			.deleteId(id)
			.then(() => {
				setNumbers(numbers.filter(n => n.id !== id))
			})
			.catch(err => {
				alert ( `the number ${name},${id} was not deleted`)
				console.log('deleting number', err)
			})
	}

	return (
		<div>
			<h2>Numbers</h2>
			<ul>
				{numbers.map(p => 
					<NumberListItem key={p.id} number={p} action={handleDelete}/>
				)}
			</ul>
		</div>
	)
}

const NumberListItem = ({number, action}) => (
	<li>
		{number.name} - {number.number}
		<button onClick={() => action(number)}>delete</button>
	</li>
)

export default App