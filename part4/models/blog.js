const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Title is required'],
	},
	author: {
		type: String,
		required: [true, 'Author is required'],
	},
	url: {
		type: String,
		required: [true, 'URL is required'],
	},
	likes: {
		type: Number,
		default: 0,
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
