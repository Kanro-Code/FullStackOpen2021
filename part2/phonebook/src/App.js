import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import axios from 'axios'
import Persons from './services/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
	const [filter, setFilter] = useState('')

	const addPerson = (person) => {
		for (let i = 0; i < persons.length; i++) {
			if (persons[i].name === person.name) 
				return false;
		}
		setPersons([...persons, person])
		return true
	}

	const filterPerson = (ps) => (
		ps.filter((p => p.name.includes(filter)))
	)

	useEffect(() => {
		console.log('Fetching persons')
		Persons.getAll()
			.then(res => setPersons(res))
	}, [])

  return (
    <div>
			<h2>Phonebook</h2>
			<Filter 
				filter={filter} 
				setFilter={setFilter} 
			/>

			<h2>add a new</h2>
			<Phonebook 
				addPerson={addPerson} 
				/>

			<h2>Numbers</h2>
      <Numbers 
				persons={filterPerson(persons)}
			/>
    </div>
  )
}

const Filter = ({filter, setFilter}) => {
	const handleFilterChange = (e) => setFilter(e.target.value)
	return (
		<div>
			<input 
				value={filter} 
				onChange={handleFilterChange} 
			/>
		</div>
	)
}

const Phonebook = ({addPerson}) => {
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')

	const handleNameChange = (e) => setNewName(e.target.value)
	const handleNumberChange = (e) => setNewNumber(e.target.value)
	
	const submitPerson = (e) => {
		e.preventDefault()
		let res = addPerson({
			name: newName,
			number: newNumber,
			id: nanoid()
		})

		if (res) {
			setNewName('')
			setNewNumber('')
		} else {
			window.alert(`${newName} is already added to the phonebook`)
		}
	}

	return (
		<div>
			<form onSubmit={submitPerson}>
				<div>
					name: <input 
						value={newName} 
						onChange={handleNameChange} 
					/> <br />
					number: <input
						value={newNumber}
						onChange={handleNumberChange}
					/> <br />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
		</div>
	)
}

const Numbers = ({persons}) => (
	<div>
		{persons.length
			? <NumbersList persons={persons}/>
			: <div>...</div>
		}
	</div>
)

const NumbersList = ({persons}) => (
	<ul>
		{persons.map((person) =>
			<NumbersListItem 
				key={person.id} 
				person={person} />
		)}
	</ul>
)

const NumbersListItem = ({person}) => (
	<li>{person.name} {person.number}</li>
)

export default App