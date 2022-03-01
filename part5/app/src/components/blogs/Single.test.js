import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Single from './Single'

const testBlog = () => (
	{
		title: 'Everything starts from a dot',
		author: 'S. Goodman',
		url: 'http://www.google.com',
		likes: 2,
		user: {
			name: 'Single user',
			username: 'UserSingle',
			id: '123abc',
		},
	}
)

const testUser = () => (
	{
		username: 'GoodName123',
		name: 'Good U. Name',
	}
)

describe('<Single/>', () => {
	let component
	let blog
	let mockHandler

	const clickDetails = () => {
		const bt = screen.getByText('Show')
		userEvent.click(bt)
	}

	beforeEach(() => {
		blog = testBlog()
		mockHandler = jest.fn()
		component = render(
			<Single
				blog={blog}
				user={testUser()}
				handleDelete={mockHandler}
				handleLike={mockHandler}
			/>,
		)
	})

	test('Showing author/title, no other info', () => {
		expect(component.container).toHaveTextContent(blog.author)
		expect(component.container).toHaveTextContent(blog.title)
		expect(component.container).not.toHaveTextContent(blog.url)
		expect(component.container).not.toHaveTextContent(blog.likes)
	})

	test('Show likes and url when shown details', () => {
		clickDetails()
		expect(component.container).toHaveTextContent(blog.author)
		expect(component.container).toHaveTextContent(blog.title)
		expect(component.container).toHaveTextContent(blog.likes)
		expect(component.container).toHaveTextContent(blog.url)
	})

	test('Click like button multiple times', () => {
		clickDetails()
		const bt = screen.getByText('Like')
		userEvent.click(bt)
		userEvent.click(bt)

		const { calls } = mockHandler.mock
		expect(calls).toHaveLength(2)
		expect(calls[0][0]).toEqual(blog)
		expect(calls[1][0]).toEqual(blog)
	})
})

test('<Single/>', () => {
	const blog = testBlog()
	const user = testUser()
	render(
		<Single
			blog={blog}
			user={user}
			handleDelete={() => {}}
			handleLike={() => {}}
		/>,
	)
})
// test('')
