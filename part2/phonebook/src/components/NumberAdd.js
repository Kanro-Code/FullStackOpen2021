import React, { useState } from 'react'

const NumberAdd = ({handleAdd}) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const handleName = e => setName(e.target.value)
  const handleNumber = e => setNumber(e.target.value)

  const handleSubmit = e => {
    e.preventDefault()
    handleAdd({name, number})
    setName('')
    setNumber('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>add a new</h2>
      name: <input onChange={handleName} value={name} /> <br />
      number: <input onChange={handleNumber} value={number} /> <br />
      <button type='submit'>save</button>
    </form>
  )
}

export default NumberAdd