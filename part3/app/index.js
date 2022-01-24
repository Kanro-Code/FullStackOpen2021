require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Person = require('./models/person')

const morgan = require('morgan')
morgan.token('data', (req) => 
  (req.method === "POST")
    ? JSON.stringify(req.body)
    : ''
)

const app = express()
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(cors())
app.use(express.static('build'))

const PORT = process.env.PORT || 3001

const generateId = () => {
  return Math.floor((Math.random()*100000))
}

app.get('/info', (request, response) => {
  Person
    .find({})
    .then(persons => {
      response.send(
        `Phonebook has info for ${persons.length} people <br> ${new Date()}`
      )
    })
})

app.get('/api/person', (request, response) => {
  Person
    .find({})
    .then(persons => response.json(persons))
})

app.post('/api/person', (request, response) => {
  const {name, number} = request.body
  
  if (name === undefined || number === undefined) 
    return EmptyValueError(response, 'name or body')
  
  const person = new Person({name,number})
  person
    .save()
    .then(p => response.json(p))
})

app.get('/api/person/:id', (request, response) => {
  const id = request.params.id
  Person
    .findById(id)
    .then(person => response.json(person))
    .catch(err => {
      console.log(err)
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.delete('/api/person/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)

  response.status(204).end()
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const UniqueValueError = (response, message) => {
  ValueError(response, `Must be unique: ${message}`)
}

const EmptyValueError = (response, message) => {
  ValueError(response, `EmptyValue: ${message}`)
}

const ValueError = (response, message) => (
  response.status(400).json(message)
)
