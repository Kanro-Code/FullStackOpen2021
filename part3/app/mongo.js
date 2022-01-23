const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})
const Person = mongoose.model('Person', personSchema)



if (process.argv.length < 3) {
  console.log('Please provide the password '
  + 'as an argument: requires node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://root:${password}@cluster0.usq92.`
 + `mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

if (!name || !number) {
  listPersons()
} else if (process.argv.length === 5) {
  savePerson(new Person({name, number}))
}

function savePerson(person) {
  person.save().then(({name, number}) => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

function listPersons() {
  Person.find({}).then(res => {
    console.log("phonebook:")
    res.map(p => console.log(`${p.name} ${p.number}`))
    mongoose.connection.close()
  })
}