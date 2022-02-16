import React from 'react'
import PropTypes from 'prop-types'
import Blog from './Blog'
import New from './New'
import Toggleable from '../Toggleable'

const Blogs = React.forwardRef((props, ref) => {
	const { blogs, handleNewBlog, handleDelete, handleLike, user } = props
	return (
		<div>
			<Toggleable label="Add new blog" state={false} ref={ref}>
				<New handleNewBlog={handleNewBlog} />
			</Toggleable>

			<h3>Bloglist</h3>

			{(!blogs)
				? <div>No blogs at this time</div>
				: (
					<ul>
						{blogs.map((b) => (
							<Blog
								key={b.id}
								blog={b}
								handleDelete={handleDelete}
								handleLike={handleLike}
								user={user}
							/>
						))}
					</ul>
				)}

		</div>
	)
})

Blogs.propTypes = {
	blogs: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			author: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
			likes: PropTypes.number.isRequired,
		}),
	).isRequired,
	handleNewBlog: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired,
	handleLike: PropTypes.func.isRequired,
	user: PropTypes.shape({
		username: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	}).isRequired,
}

Blogs.displayName = 'Blogs'

export default Blogs
