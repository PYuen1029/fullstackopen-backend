const mongoose = require('mongoose')
const logger = require("../utils/logger");
const config = require("../utils/config");

const url = config.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.info('error connecting to MongoDB:', error.message)
    })

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        required: true
    },
    author: {
        type: String,
    },
    url: {
        type: String,
        minlength: 3,
        required: true
    },
    likes: {
        type: Number,
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)
