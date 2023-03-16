// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((pv, v) => pv + v.likes, 0)
}

const favoriteBlog  = blogs => {

  const mostLikes = Math.max(...blogs.map(e => e.likes))
  const blogWithMostLikes = blogs.find(b => b.likes === mostLikes)

  return {
    title: blogWithMostLikes.title,
    author: blogWithMostLikes.author,
    likes: blogWithMostLikes.likes
  }
}

const mostBlogs = blogs => {
  const authorsBlogs = blogs.reduce((cb, b) => {
    if (cb[b.author]) cb[b.author]++
    else cb[b.author] = 1
    return cb
  }, {})

  const [author, numberOfBlogs] = Object.entries(authorsBlogs).sort((a,b) => b[1]-a[1])[0]

  return { author, numberOfBlogs }
}

const mostLikes = blogs => {
  const authorsLikes = blogs.reduce((cb, b) => {
    if (cb[b.author]) cb[b.author] += b.likes
    else cb[b.author] = b.likes
    return cb
  }, {})

  const [author, numberOfLikes] = Object.entries(authorsLikes).sort((a,b) => b[1]-a[1])[0]

  return { author, numberOfLikes }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}