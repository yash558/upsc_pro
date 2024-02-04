// src/components/Practice.js
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'

const Practice = () => {
  const [questions, setQuestions] = useState([])
  const [selectedOptions, setSelectedOptions] = useState({})
  const [score, setScore] = useState(null)
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0)
  const [showSolution, setShowSolution] = useState(false)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/questions')
        const data = await response.json()
        setQuestions(data)
      } catch (error) {
        console.error('Error fetching questions:', error)
      }
    }

    fetchQuestions()
  }, [])

  const handleOptionChange = (questionId, selectedOption) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionId]: selectedOption,
    }))
  }

  const handleSubmit = () => {
    let newScore = 0
    questions.forEach((question) => {
      if (selectedOptions[question._id] === question.correctOption.toString()) {
        newScore += 1
      }
    })
    setScore(newScore)
  }

  const toggleSolution = (index) => {
    setShowSolution(!showSolution)
    setSelectedQuestionIndex(index)
  }

  const isSolutionVisible = (index) =>
    showSolution && selectedQuestionIndex === index

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Quiz Practice</h1>
        </div>
      </div>

      <div className="flex-1 flex bg-white">
        <div className="w-full p-6 transition duration-500 ease-in-out transform">
          <Toaster />
          {questions.map((question, index) => (
            <div key={index} className="question-panel mb-8 border-b-2 pb-8">
              <div className="mb-4">
                <h2 className="text-xl text-left font-semibold text-gray-800">
                  Question {index + 1}: {question.questionText}
                </h2>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex} className="text-gray-700">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`question-${question._id}`}
                        value={optionIndex + 1}
                        checked={
                          selectedOptions[question._id] ===
                          (optionIndex + 1).toString()
                        }
                        onChange={() =>
                          handleOptionChange(
                            question._id,
                            (optionIndex + 1).toString(),
                          )
                        }
                        className="mr-2"
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
              <div className="flex items-start flex-col">
                <button
                  onClick={() => toggleSolution(index)}
                  className={`mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none ${
                    isSolutionVisible(index) ? 'bg-red-500' : ''
                  }`}
                >
                  {isSolutionVisible(index) ? 'Hide Solution' : 'Show Solution'}
                </button>

                {isSolutionVisible(index) && (
                  <div className="mt-4 p-4 bg-gray-200 rounded-md">
                    <p className="text-gray-800 font-semibold">
                      Solution: {question.solution}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="mt-6 flex flex-col items-center justify-center">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
            >
              Submit
            </button>

            {score !== null && (
              <div className="mt-6 text-center">
                <p className="text-2xl font-semibold text-green-500">
                  Your Score: {score}/{questions.length}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Practice
