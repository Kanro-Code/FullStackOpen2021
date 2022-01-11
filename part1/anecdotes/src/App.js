import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    {
      text: 'If it hurts, do it more often',
      votes: 0
    },
    {
      text: 'Adding manpower to a late software project makes it later!',
      votes: 0
    },
    {
      text: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      votes: 0
    },
    {
      text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      votes: 0
    },
    {
      text: 'Premature optimization is the root of all evil.',
      votes: 0
    },
    {
      text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      votes: 0
    },
    {
      text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
      votes: 0
    }
  ]
   
  const [selected, setSelected] = useState(0)

  return (
    <div>
      <p>{anecdotes[selected].text}</p>
      <RandomButton selected={selected} setter={setSelected} max={anecdotes.length-1} />
    </div>
  )
}

const getNewRandom = (prev, max) => {
  let roll = (Math.random() * max).toFixed(0)
  return (prev !== roll) ? roll : getNewRandom(prev, max)
}

const RandomButton = ({selected, setter, max}) => (
  <button onClick={ () => (setter(getNewRandom(selected, max)))}>next anecdote</button>
)

export default App