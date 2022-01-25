import React, { useState, useEffect } from 'react'
import Persons from '../services/Persons'
import Filter from './Filter'
import NumberList from './NumberList'
import Notifications from './Notifications'
import NumberAdd from './NumberAdd'

const App = () => {
	const [persons, setPersons] = useState([])
	const [filter, setFilter] = useState('')
	const [notification, setNotification] = useState({})

	const filterPersons = () => (
		persons.filter(({name}) => name.includes(filter))
	)

	const handleDelete = ({id, name}) => {
		Persons
		.deleteId(id)
		.then(() => {
			setPersons(persons.filter(p => id !== p.id))
			sendNotification(`${name} was deleted!`, 'succes')
		})
		.catch(err => {
			const message = `Was unable to delete ${name}`
			+ `at this time`
			sendNotification(message, 'error')
		})
	}

	const handleAdd = (person) => {
		const exisiting = persons.find(p => p.name === person.name)
		if (exisiting) {
			handleExisiting({...exisiting, number: person.number})
		} else {
			Persons
			.create(person)
			.then((res) => {
				setPersons([...persons, res])
				sendNotification(`${res.name} was added.`, 'succes')
			})
			.catch(err => {
				sendNotification(err.response.data.message, 'error')
			})
		}
		
	}

	const handleExisiting = (person) => {
		if (window.confirm(`${person.name} is already added, ` +
		`want to update the number?`)) {
			Persons
			.update(person.id, person)
			.then(res => {
				setPersons(persons.map(p => (p.id !== res.id ? p : res)))
				sendNotification(`${res.name} had their number changed!`, 'succes')
			})
			.catch(err => {
				sendNotification(err.response.data.message, 'error')
			})
		}
	}

	const sendNotification = (message, type) => {
		console.log('Notification:', message, type)
		setNotification({message: message, type: type})
		setTimeout(() => setNotification({}), 5000)

	}

	useEffect(() => 
		Persons
		.getAll()
		.then(res => setPersons(res))
	,[])

	return (
		<div>
			<h2>Phonebook Heroku Edition</h2>
			<Notifications notification={notification} />
			<Filter setFilter={setFilter} />
			<NumberAdd handleAdd={handleAdd} />
			<NumberList 
				persons={filterPersons()} 
				handleDelete={handleDelete} 
			/>
		</div>
	)
}

export default App