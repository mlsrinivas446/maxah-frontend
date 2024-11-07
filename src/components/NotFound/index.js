import React from 'react'
import "./index.css"

// function to display route cannot found on server
const NotFound = () => {
  return (
    <div className='not-found-container'>
      <img
        src="https://res.cloudinary.com/dhp3qpdhg/image/upload/v1730975743/bpb657ikzlhaklsuvy3h.png"
        alt="not found"
        className="not-found-image"
      />
      <h1 className='text-secondary fs-5'>Page Not Found</h1>
      <p className='text-secondary w-80 text-center'>we are sorry, the page you requested could not be found.</p>
    </div>
  )
}

export default NotFound
