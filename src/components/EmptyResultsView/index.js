import React from 'react'
import "./index.css"

// function to display empty search results
const EmptyResultsView = () => {
  return (
    <div className="empty-results-container">
        <img
            src="https://res.cloudinary.com/dhp3qpdhg/image/upload/v1730977446/xgtqscdiccxdaicjdveu.png"
            alt="empty results"
            className="empty-results-image"
        />
        <h1 className='text-secondary fs-5'>No Search results found</h1>
        <p className='text-secondary w-80 text-center'> Try different key words or remove search filter</p>
    </div>
  )
}

export default EmptyResultsView
