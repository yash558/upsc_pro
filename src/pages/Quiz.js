// src/components/HomePage.js
import React from 'react'
import { Link } from 'react-router-dom'

const Quiz = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <Link to="/practice">
        <div className="m-4 cursor-pointer">
          <div className="bg-blue-500 p-8 text-white rounded shadow-md">
            <h2 className="text-2xl font-semibold">Quiz</h2>
          </div>
        </div>
      </Link>
      <Link to="/test">
        <div className="m-4 cursor-pointer">
          <div className="bg-green-500 p-8 text-white rounded shadow-md">
            <h2 className="text-2xl font-semibold">Practice</h2>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Quiz
