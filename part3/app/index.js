/* eslint-disable consistent-return */
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

const PORT = process.env.PORT || 3002
const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(cors())

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

// Routing GETS
app.get('/info', (req, res, next) => {
	Person
		.find({})
		.then((p) => {
			res.send(`Phonebook has info for ${p.length} people<br>${new Date()}`)
		})
		.catch((err) => next(err))
})

app.get('/api/person', (req, res, next) => {
	Person
		.find({})
		.then((p) => res.json(p))
		.catch((err) => next(err))
})

app.get('/api/person/:id', (req, res, next) => {
	Person
		.findById(req.params.id)
		.then((p) => {
			if (p) {
				res.json(p)
			} else {
				res.status(404).end()
			}
		})
		.catch((err) => next(err))
})

//  Routing POST
app.post('/api/person', (req, res, next) => {
	console.log(req.body)
	const { name, number } = req.body
	if (!name || !number) {
		return res.status(400).json({
			error: 'Name or Number missing',
		})
	}

	const person = new Person({ name, number })
	person.save()
		.then((p) => res.json(p))
		.catch((err) => next(err))
})

app.put('/api/person/:id', (req, res, next) => {
	const { id } = req.params
	Person
		.findByIdAndUpdate(id, {
			name: req.body.name,
			number: req.body.number,
		}, { runValidators: true })
		.then((p) => {
			res.json(p)
		})
		.catch((err) => next(err))
})

// Routing DELETE
app.delete('/api/person/:id', (req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then(() => res.status(204).end())
		.catch((err) => next(err))
})

// Middleware
const errorHandler = (err, req, res, next) => {
	if (err.name === 'CastError') {
		return res.status(400).send({ error: 'Malformatted id' })
	} if (err.name === 'ValidationError') {
		console.log('ValidationError', err.message)
		return res.status(400).json(err)
	}

	next(err)
}

morgan.token('data', (req) => (
	(req.method === 'POST')
		? JSON.stringify(req.body)
		: ''
))

const format = (tokens, req, res) => [
	tokens.method(req, res),
	tokens.url(req, res),
	tokens.status(req, res),
	tokens.res(req, res, 'content-length'), '-',
	tokens['response-time'](req, res), 'ms',
	tokens.data(req),
].join(' ')

// Middleware assignment
app.use(errorHandler)
app.use(morgan(format))
