import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

const blog = {
  'title': 'Sparkling Ink',
  'author': 'Cameron Grant',
  'user': {
    'username': 'Mostapha',
    'name': 'Mustapha Bouh',
    'id': '6404b7f47925592c34c5fb31'
  },
  'url': 'https://www.sparklingink.com',
  'likes': 7,
  'id': '6408c665f632db580b37f068'
}

const user = {
  'username': 'Mostapha',
}

test('renders title and author but not url', () => {
  render(<Blog blog={blog} user={user} />)

  const elementByTitleAndAuthor = screen.getByText(`${blog.title} by ${blog.author}`,  { exact: false })
  const elementByUrl = screen.queryByText(blog.url,  { exact: false })

  expect(elementByTitleAndAuthor).toBeDefined()
  expect(elementByUrl).toBeNull()
})

test('URL and likes are shown when view is clicked', async () => {
  render(<Blog blog={blog} user={user} />)

  const userEv = userEvent.setup()
  const viewButton = screen.getByText('view')
  await userEv.click(viewButton)

  const elementByUrl = screen.queryByText(blog.url,  { exact: false })
  const elementByLikes = screen.queryByText(`likes: ${blog.likes}`,  { exact: false })

  expect(elementByUrl).not.toBeNull()
  expect(elementByLikes).not.toBeNull()
})

test('event handler is called the number of like clicks', async () => {
  const handleLikeClick = jest.fn()
  render(<Blog blog={blog} user={user} handleLikeClick={handleLikeClick} />)

  const userEv = userEvent.setup()
  const viewButton = screen.getByText('view')
  await userEv.click(viewButton)

  const likeButton = screen.getByText('like')
  await userEv.click(likeButton)
  await userEv.click(likeButton)

  expect(handleLikeClick.mock.calls).toHaveLength(2)
})

test('form calls the event handler with the correct data', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const titleInput = container.querySelector('input[name="title"]')
  const authorInput = container.querySelector('input[name="author"]')
  const urlInput = container.querySelector('input[name="url"]')

  const createButton = screen.getByText('create')

  const dummy = {
    'title': 'Sparkling Ink',
    'author': 'Cameron Grant',
    'url': 'https://www.sparklingink.com/'
  }

  await user.type(titleInput, dummy.title)
  await user.type(authorInput, dummy.author)
  await user.type(urlInput, dummy.url)
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(dummy.title)
  expect(createBlog.mock.calls[0][0].author).toBe(dummy.author)
  expect(createBlog.mock.calls[0][0].url).toBe(dummy.url)
})