import React from 'react'
import "./index.css"


// function to display on api failure
const ApiFailureView = () => {
    return (
        <div className="api-failure-container">
            <img
                src="https://res.cloudinary.com/dhp3qpdhg/image/upload/v1730975913/a9un3wfphssztwz8c9nj.png"
                alt="api failed"
                className="api-failure-image"
            />
            <h1 className='text-secondary fs-5'>Oops! Something Went Wrong</h1>
            <p className='text-secondary w-80 text-center'>We are having some trouble to complete your request. Please try again</p>
        </div>
    )
}

export default ApiFailureView
