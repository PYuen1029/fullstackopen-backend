require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs');
const logger = require('./utils/logger')
const config = require('./utils/config')

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

const PORT = config.PORT
app.listen(PORT, () => {
    logger.info(`\r\nServer running on port ${PORT}`, `\r\nall systems operational`, `\r\nlasers set to death`)
})
