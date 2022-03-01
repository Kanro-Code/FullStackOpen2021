import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import New from './New'

describe('Using form to create new blog', () => {
	let mockHandler

	const testBlog = () => (
		{
			author: 'Form author',
			title: 'Jest form test',
			url: 'https://www.fullstackopen.com',
		}
	)

	beforeEach(() => {
		mockHandler = jest.fn()
		render(
			<New handleNewBlog={mockHandler} />,
		)
	})

	test('Succesfully add a blog', () => {
		const blog = testBlog()

		const author = screen.getByPlaceholderText('Author')
		const title = screen.getByPlaceholderText('Title')
		const url = screen.getByPlaceholderText('Url')

		userEvent.type(author, blog.author)
		userEvent.type(title, blog.title)
		userEvent.type(url, blog.url)

		const submit = screen.getByText('Create')
		userEvent.click(submit)

		const { calls } = mockHandler.mock
		expect(calls).toHaveLength(1)
		expect(calls[0][0].author).toBe(blog.author)
		expect(calls[0][0].title).toBe(blog.title)
		expect(calls[0][0].url).toBe(blog.url)
	})
})
