import React from 'react'

const NumberList = ({persons, handleDelete}) => (
  <div>
    <h2>Numbers</h2>
    <ul>
      {(persons.length > 0)
        ? persons.map(p =>
          <ListItem 
            key={p.id} 
            person={p} 
            handleDelete={handleDelete} 
          />)
        : <li>No numbers at this time</li>
      }
    </ul>
  </div>
)


const ListItem = ({person, handleDelete}) => (
  <li>
    {person.name} - {person.number}
    <button onClick={() => handleDelete(person)}>delete</button>
  </li>
)


export default NumberList