import React from 'react'
import {Bars} from "react-loader-spinner"
import "./index.css"

// function to display on loading status
const ApiLoadingView = () => {
  return (
    <div className="loader-container">
      <Bars
          type="ThreeDots"
          height="50"
          width="50"
      />
    </div>
  )
}

export default ApiLoadingView
