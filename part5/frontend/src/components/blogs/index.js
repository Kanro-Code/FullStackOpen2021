import React from 'react'
import Blog from './Blog'
import New from './New'
import Toggleable from '../Toggleable'

const Blogs = ({ 
	blogs, 
	handleNewBlog, 
	handleDelete, 
	ref 
}) => (
	<div>
		<Toggleable label='Add new blog' state={false} ref={ref}>
			<New handleNewBlog={handleNewBlog} />
		</Toggleable>

		<h3>Bloglist</h3>

		{(!blogs)
			? <div>No blogs at this time</div>
			: (
				<ul>
					{blogs.map((b) => 
						<Blog
							key={b.id}
							blog={b}
							handleDelete={handleDelete}
						/>
					)}
				</ul>
			)
		}

	</div>
)

export default Blogs