const mongoose = require('mongoose')

const url = process.env.DB_URI

console.log('Connecting to mongodb')
mongoose.connect(url)
	.then(() => console.log('Connected to mongodb'))
	.catch((err) => {
		console.log('Error connected to mongodb', err.message)
	})

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
})

blogSchema.set('toJSON', {
	transform: (doc, obj) => {
		obj.id = obj._id.toString()
		delete obj._id
		delete obj.__v
	},
})

module.exports = mongoose.model('Blog', blogSchema)
