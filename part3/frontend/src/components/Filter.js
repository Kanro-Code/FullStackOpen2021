import React from 'react'

const Filter = ({setFilter}) => (
  <input onChange={(e) => setFilter(e.target.value)}></input>
)

export default Filter