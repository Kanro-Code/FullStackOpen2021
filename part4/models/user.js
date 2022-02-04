const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: String,
	name: String,
	passwordHash: String,
})

userSchema.set('toJSON', {
	transform: (doc, obj) => {
		obj.id = obj._id.toString()
		delete obj._id
		delete obj.__v
		delete obj.passwordHash
	},
})

const User = mongoose.model('User', userSchema)

module.exports = User
