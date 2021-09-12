const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test.only('correct amount of blogs are returned as json', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(7);
})

test.only('blog identifier is called id', async () => {
    const response = await api
        .get('/api/blogs')
    ;

    let firstBlogId = response.body[0].id;
    expect(firstBlogId).toBeDefined();
})

afterAll(() => {
    mongoose.connection.close()
})
