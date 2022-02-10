import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then((b) =>
      setBlogs(b)
    )  
  }, [])

  return (
    <div>
      <h2>blogs</h2>
		<LoginForm />
		<Blogs blogs={blogs} />
    </div>
  )
}

export default App