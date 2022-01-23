const express = require('express')
const cors = require('cors')
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

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const generateId = () => {
  return Math.floor((Math.random()*100000))
}

app.get('/info', (request, response) => {
  response.send(
    `Phonebook has info for ${persons.length} people <br> ${new Date()}`
  )
})

app.get('/api/person', (request, response) => {
  response.json(persons)
})

app.post('/api/person', (request, response) => {
  const { name, number } = request.body

  if (!name) {
    return EmptyValueError(response, 'person.name')
  } else if (!number) {
    return EmptyValueError(response, 'person.number')
  }

  const uniqueName = persons.filter(p => p.name === name)
  if (uniqueName.length) {
    return UniqueValueError(response, 'peron.name')
  }

  const uniqueNumber = persons.filter(p => p.number === number)
  if (uniqueNumber.length) {
    return UniqueValueError(response, 'person.number')
  }

  const person = {
    id: generateId(),
    name, 
    number
  }

  persons = persons.concat(person)
  console.log(person)
  response.json(person)
})

const UniqueValueError = (response, message) => {
  ValueError(response, `Must be unique: ${message}`)
}

const EmptyValueError = (response, message) => {
  ValueError(response, `EmptyValue: ${message}`)
}

const ValueError = (response, message) => {
  return response.status(400).json(message)
}

app.get('/api/person/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/person/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)

  response.status(204).end()
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
