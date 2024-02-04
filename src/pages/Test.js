import React, { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

const QuestionList = () => {
  const [questions, setQuestions] = useState([])
  const [selectedOptions, setSelectedOptions] = useState({})
  const [score, setScore] = useState(null)
  const [timer, setTimer] = useState(300) // 300 seconds (5 minutes)
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/questions')
        const data = await response.json()
        setQuestions(data)
        console.log(data)
      } catch (error) {
        console.error('Error fetching questions:', error)
      }
    }

    fetchQuestions()
  }, [])

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1)
    }, 1000)

    if (timer === 0) {
      clearInterval(countdown)
      handleSubmit()
    }

    return () => clearInterval(countdown)
  }, [timer])

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
    setSelectedOptions({})

    // Move to the next question
    const nextQuestionIndex = selectedTabIndex + 1
    if (nextQuestionIndex < questions.length) {
      setSelectedTabIndex(nextQuestionIndex)
    }
  }

  const resetQuiz = () => {
    setSelectedOptions({})
    setScore(null)
    setTimer(300)
    setSelectedTabIndex(0)
  }

  return (
    <div className="flex flex-col h-screen bg-gray/80">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Quiz Time</h1>
          <div className="text-lg">
            Time Remaining: {Math.floor(timer / 60)}:
            {timer % 60 < 10 ? '0' : ''}
            {timer % 60} minutes
          </div>
        </div>
      </div>

      <div className="flex-1 flex bg-white">
        <div className="w-1/5 bg-gray/90 text-white pt-4 pr-4">
          <div className="cursor-pointer">
            {questions.map((question, index) => (
              <div
                key={index}
                className={`question-tab mb-2 p-3 rounded-r-2xl text-center transition duration-300 ease-in-out ${
                  selectedTabIndex === index
                    ? 'bg-blue-500'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
                onClick={() => setSelectedTabIndex(index)}
              >
                Question-{index + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="w-4/5 p-6">
          <Toaster />
          {questions.map((question, index) => (
            <div
              key={index}
              className={`question-panel ${
                selectedTabIndex === index ? 'block' : 'hidden'
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl text-left ml-8 font-semibold mb-4 text-gray-800">
                  Question {index + 1} {question.questionText}
                </h2>
                <h2 className="text-xl text-left ml-8 font-semibold mb-4 text-gray-800">
                  {question.topic} | {question.year}
                </h2>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ml-8">
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
            </div>
          ))}

          <div className="mt-6 flex items-center justify-center">
            {!score || selectedTabIndex < questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
              >
                Submit
              </button>
            ) : null}

            {score !== null && selectedTabIndex === questions.length - 1 && (
              <button
                onClick={resetQuiz}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Restart Quiz
              </button>
            )}
          </div>

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
  )
}

export default QuestionList
