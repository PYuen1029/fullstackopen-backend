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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
