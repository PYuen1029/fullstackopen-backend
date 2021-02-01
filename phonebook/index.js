const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())

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

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    const count = persons.length;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date().toString();

    response.send(`
<p>Phonebook has info for ${count} people</p>
<p>${date}</p>
`
    )
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
    response.json(persons)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    let lastPersonId = persons.reduce((value, carry) => {
        return value.id > carry.id ? value : carry
    }).id;

    morgan.token('postData', function getPostData(req, res) {
        return JSON.stringify(req.body.content);
    })

    const newPerson = {
        "id": lastPersonId + 1,
        "name": body.content.name,
        "number": body.content.number
    };

    persons = persons.concat(newPerson)

    response.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

