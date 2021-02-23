const mongoose = require('mongoose')

// USAGE:
// node mongo.js yourpassword Anna 040-1234556
// node mongo.js yourpassword

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
    //  `mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`
    `mongodb+srv://nobisnews:${password}@cluster0.gts9p.mongodb.net/phonebook-app?retryWrites=true&w=majority`


mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

const personSchema = new mongoose.Schema({
    name: String,
    phoneno: String
})

const Person = mongoose.model('Person', personSchema)

if (name && name.length) {
    if (!number) {
        console.log('You need to provide both a name and a number to add a new record.')
        mongoose.connection.close()
        process.kill(process.pid, 'SIGTERM')
    }

    const person = new Person({
        name: name,
        phoneno: number,
    })

    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}
