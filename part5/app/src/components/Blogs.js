import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'

const Blogs = ({blog}) => {
	const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


	return (
		<div>
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} />
			)}
		</div>
	)
}

export default Blogs
