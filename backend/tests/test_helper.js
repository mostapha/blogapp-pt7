const Blog = require('../models/blog')

const initialBlogs = [
  {
    'title': 'Flourish',
    'author': 'Candace Grace',
    'likes': 126,
    'url': 'https://www.flourishblog.com/'
  },  {
    'title': 'Nimble Mind',
    'author': 'Ella Nova',
    'likes': 80,
    'url': 'https://www.nimblemind.com/'
  },  {
    'title': 'Starlight',
    'author': 'Jasmine Stone',
    'likes': 234,
    'url': 'https://www.starlightblog.com/'
  },  {
    'title': 'Chirp',
    'author': 'Oliver Finch',
    'likes': 67,
    'url': 'https://www.chirpblog.net/'
  },  {
    'title': 'Ripple',
    'author': 'Avery Drake',
    'likes': 312,
    'url': 'https://www.rippleblog.com/'
  }
]

const blogToBeAdded = {
  'title': 'Gleaming Thoughts',
  'author': 'Adrianne Smith',
  'likes': 1500,
  'url': 'https://www.gleamingthoughts.com/'
}

const blogWithoutLikesProp = {
  'title': 'Sparkling Ink',
  'author': 'Cameron Grant',
  'url': 'https://www.sparklingink.com/'
}

const blogWithoutTitle = {
  'author': 'Nina Hernandez',
  'likes': 3000,
  'url': 'https://www.radiantpages.com/'
}

const blogWithoutUrl = {
  'title': 'Radiant Pages',
  'author': 'Nina Hernandez',
  'likes': 3000
}


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  blogsInDb, initialBlogs, blogToBeAdded, blogWithoutLikesProp, blogWithoutTitle, blogWithoutUrl
}