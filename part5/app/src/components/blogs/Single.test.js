import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Single from './Single'

test('renders content', () => {
	const blog = {
		title: 'Everything starts from a dot',
		author: 'S. Goodman',
		url: 'http://www.google.com',
	}

	const user = {
		username: 'GoodName123',
		name: 'Good U. Name',
	}

	render(
		<Single
			blog={blog}
			user={user}
		/>,
	)

	const element = screen.getByText(`${blog.title} - ${blog.author}`)
	expect(element).toBeDefined()
})
