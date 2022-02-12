require('dotenv').config()

const { PORT } = process.env
const { SECRET } = process.env

if (process.env.NODE_ENV === undefined) {
	console.error('NODE_ENV needs to be set, exiting application')
	process.exit()
}

const MONGODB_URI = (process.env.NODE_ENV === 'test')
	? process.env.TEST_MONGODB_URI
	: process.env.MONGODB_URI

module.exports = { PORT, MONGODB_URI, SECRET }
