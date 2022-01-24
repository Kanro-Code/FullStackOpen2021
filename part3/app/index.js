require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')
const PORT = process.env.PORT || 3002

// Middleware assignment
const app = express()
app.use(morgan())
app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Morgan POST request logger
const { application, response } = require('express')
morgan.token('data', (req) => 
  (req.method === "POST")
    ? JSON.stringify(req.body)
    : ''
)

const morganFunction = (tokens, req, res) => (
  [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    // res
  ].join(' ')
)

// app.use(morgan(morganFunction))
// app.use(morgan('tiny'))


// Routing GETS
app.get('/info', (req, res, next) => {
  Person
    .find({})
    .then(p => {
      res.send(`Phonebook has info for ${p.length} people<br>${new Date()}`)
    })
    .catch(err => next(err))
})

app.get('/api/person', (req, res, next) => {
  Person
    .find({})
    .then(p => res.json(p))
    .catch(err => next(err))
})

app.get('/api/person/:id', (req, res, next) => {
  Person
    .findById(req.params.id)
    .then(p => {
      if (note) {
        res.json(note)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})

//  Routing POST
app.post('/api/person', (req, res, next) => {
  const {name, number} = req.body

  if (!name || !number) {
    return res.status(400).json({
      error: 'Name or Number missing'
    })
  }

  const person = new Person({ name, number })
  person.save()
    .then(p => res.json(p))
    .catch(err => next(err))
})

// Routing DELETE
app.delete('/api/person/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(p => res.status(204).end())
    .catch(err => next(err))
})

// Middleware 
function errorHandler(err, req, res, next) {
  console.log(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'Malformatted id' })
  }

  next(error)
}

