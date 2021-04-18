const _ = require('lodash')

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.likes;
    }, 0)
}

const favoriteBlog = (blogs) => {
    const favoriteBlog = blogs.reduce((accumulator, currentValue) => {
        return accumulator.likes > currentValue.likes ?
            accumulator :
            currentValue;
    })

    return {
        title: favoriteBlog.title,
        author: favoriteBlog.author,
        likes: favoriteBlog.likes,
    }
}

const mostBlogs = (blogs) => {
    let blogCounter = {};
    blogs.forEach((blog) => {
        let currCount = _.get(blogCounter, blog.author, 0)
        _.set(blogCounter, `['${blog.author}']`, ++currCount)
    })

    const mostBlogsAuthor =Object.keys(blogCounter).reduce((a, b) => {
        return blogCounter[a] > blogCounter[b] ? a : b;
    })

    return {
        author: mostBlogsAuthor,
        blogs: blogCounter[mostBlogsAuthor]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}
