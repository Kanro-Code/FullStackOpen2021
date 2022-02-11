import React from 'react'
import Blog from './Blog'
import New from './New'

const Blogs = ({ blogs, handleNewBlog, handleDelete }) => (
	<div>
		<New handleNewBlog={handleNewBlog} />

		<h3>Bloglist</h3>
		{ (!blogs)
			? <div>No blogs at this time</div>
			: blogs.map(blog =>
				<Blog 
					key={blog.id} 
					blog={blog}
					handleDelete={handleDelete} 
				/>
			)
		}
	</div>
)

export default Blogs