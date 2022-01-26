const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
const reg = /^\d{2,}-\d{2,}$/

console.log(`Connecting to ${url}`)

mongoose.connect(url)
	.then((res) => console.log('Connected to mongodb', res))
	.catch((err) => {
		console.log('Error connecting to Mongodb', err.message)
	})

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: [3, 'Name must be at least 3 characters'],
		required: [true, 'Name is required'],
	},
	number: {
		type: String,
		minlength: [8, 'Number must be at least 8 characters'],
		required: [true, 'Number is required'],
		validate: {
			validator: (v) => reg.test(v),
			message: (v) => `${v.value} is not a valid phone number!`,
		},
	},
})

personSchema.set('toJSON', {
	transform: (document, obj) => {
		obj.id = obj._id.toString()
		delete obj._id
		delete obj.__v
	},
})

module.exports = mongoose.model('Person', personSchema)
