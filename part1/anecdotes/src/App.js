import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ]
  
  const points = [];
  for (let i = 0; i < anecdotes.length; i++) 
    points[i] = 0

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(points[selected])

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {votes}</p>
      <VoteButton selected={selected} points={points} setVotes={setVotes} votes={votes} />
      <RandomButton selected={selected} setter={setSelected} max={anecdotes.length-1} />
    </div>
  )
}

const getNewRandom = (prev, max) => {
  let roll = (Math.random() * max).toFixed(0)
  return (prev !== roll) ? roll : getNewRandom(prev, max)
}

const RandomButton = ({selected, setter, max}) => (
  <button onClick={() => (setter(getNewRandom(selected, max)))}>next anecdote</button>
)

const VoteButton = ({selected, points, setVotes, votes}) => (
  <button onClick={() => {
    points = [...points]
    points[selected] += 1
    votes = points[selected]
    setVotes(votes)
  }}>vote</button>
)

export default App