require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')

/**
 * MIDDLEWARE
 */

app.use(express.json())

app.use(cors())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

morgan.token('postData', function getPostData(req, res) {
    return '';
})

/**
 * Routes
 */

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    Person.count({}).then(result => {
        const date = new Date().toString();

        response.send(`
<p>Phonebook has info for ${result} people</p>
<p>${date}</p>
`
        )

    });
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => {
        response.json(result)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = new Person({
        name: body.name,
        phoneno: body.number,
    })

    person.save().then(result => {
        console.log(result)
        response.json(person)
    })
})

/**
 * Config
 */

let port = process.env.PORT;
if (port == null || port == '') {
    port = 3001;
}
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

