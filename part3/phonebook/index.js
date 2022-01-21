const express = require('express')
const app = express()
const morgan = require('morgan')
morgan.token('data', (req) => 
  (req.method === "POST")
    ? JSON.stringify(req.body)
    : ''
)

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

const PORT = 3001

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

app.get('/', (request, response) => {
  response.send('<h1>Hello world!</h1>')
})

app.get('/info', (request, response) => {
  let info = `Phonebook has info for ${persons.length} people <br>` 
  info += new Date()

  response.send(info)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body

  if (!name) {
    return response.status(400).json({
      error: 'name is empty'
    })
  } else if (!number) {
    return response.status(400).json({
      error: 'number is empty'
    })
  }

  const uniqueName = persons.filter(p => p.name === name)
  const uniqueNumber = persons.filter(p => p.number === number)
  if (uniqueName.length) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  } else if (uniqueNumber.length) {
    return response.status(400).json({
      error: 'number must be unique'
    })
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

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)

  response.status(204).end()
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})