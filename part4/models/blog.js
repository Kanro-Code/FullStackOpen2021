const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		minlength: [6, 'Message'],
		required: [true, 'Title is required'],
	},
	author: {
		type: String,
		minlength: [6, 'Message'],
		required: [true, 'Author is required'],
	},
	url: {
		type: String,
		minlength: [3, 'Message'],
		required: [true, 'URL is required'],
	},
	likes: {
		type: Number,
		required: [true, 'Likes is required'],
	},
})

blogSchema.set('toJSON', {
	transform: (doc, obj) => {
		obj.id = obj._id.toString()
		delete obj._id
		delete obj.__v
	},
})

module.exports = mongoose.model('Blog', blogSchema)
