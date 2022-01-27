const info = (...p) => {
	console.log(...p)
}

const error = (...p) => {
	console.error(...p)
}

module.exports = { info, error }
