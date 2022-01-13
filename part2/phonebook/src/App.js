import React, { useState } from 'react'
import { nanoid } from 'nanoid'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: nanoid() },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: nanoid() },
    { name: 'Dan Abramov', number: '12-43-234345', id: nanoid() },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: nanoid() }
  ])
	const [filter, setFilter] = useState('')

	const addPerson = (person) => {
		for (let i = 0; i < persons.length; i++) {
			if (persons[i].name === person.name) 
				return false;
		}
		setPersons([...persons, person])
		return true
	}

  return (
    <div>
			<h2>Phonebook</h2>
			<Filter />
			<h2>add a new</h2>
			<Phonebook addPerson={addPerson} />
			<h2>Numbers</h2>
      <Numbers persons={}/>
    </div>
  )
}

const Filter = () => {

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
			<NumbersListItem key={person.id} person={person} />
		)}
	</ul>
)

const NumbersListItem = ({person}) => (
	<li>{person.name} {person.number}</li>
)

export default App