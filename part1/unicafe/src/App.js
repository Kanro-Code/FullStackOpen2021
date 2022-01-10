import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h1>feedback</h1>
      <button onClick={()=>(setGood(good + 1))}>good</button>
      <button onClick={()=>(setNeutral(neutral + 1))}>neutral</button>
      <button onClick={()=>(setBad(bad + 1))}>bad</button>

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad > 0) {
    return (
      <div>
        good {good}<br />
        neutral {neutral}<br />
        bad {bad}<br />
        average {(good - bad) / (good + neutral + bad)}<br />
        positive {good/(good + neutral + bad)*100}%<br />
      </div>
    )
  } else {
    return (
      <div>
        No feedback given
      </div>
    )
  }
}
  

export default App
