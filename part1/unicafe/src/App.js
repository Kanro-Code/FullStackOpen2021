import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const Feedback = () => {
    return (
      <div>
        <Header text="give feedback" />
        <Button text="good" handler={() => setGood(good + 1)} />
        <Button text="neutral" handler={() => setNeutral(neutral + 1)} />
        <Button text="bad" handler={() => setBad(bad + 1)} />
      </div>
    )
  }
  
  const Statistics = () => {
    return (
      <div>
        <Header text="statistics" />
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
      </div>
    )
  }
  
  const Button = ({text, handler}) => (
    <button onClick={handler}>
      {text}
    </button>
  )
  
  const Header = ({text}) => (<h1>{text}</h1>)
  
  return (
    <div>
      <Feedback />
      <Statistics />
    </div>
  )
}

export default App
