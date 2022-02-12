import React from 'react'
import Blog from './Blog'
import New from './New'
import Toggleable from '../Toggleable'

const Blogs = React.forwardRef((props, ref) => {
	const { 
		blogs, 
		handleNewBlog, 
		handleDelete,
		handleLike
	} = props
	return (
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
								handleLike={handleLike}
							/>
						)}
					</ul>
				)
			}

		</div>
	)})
	

export default Blogs