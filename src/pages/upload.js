import React, { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'

function QuestionForm() {
  const [formData, setFormData] = useState({
    topic: '',
    year: '',
    questionText: '',
    options: ['', '', '', ''],
    correctOption: '1',
    solution: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name.startsWith('options[')) {
      // Handle input field changes for options
      const optionIndex = parseInt(name.match(/\[(\d+)\]/)[1])
      setFormData((prevData) => ({
        ...prevData,
        options: prevData.options.map((option, index) =>
          index === optionIndex ? value : option,
        ),
      }))
    } else {
      // Handle other input field changes
      setFormData({ ...formData, [name]: value })
    }
  }

  console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Send a POST request to the backend to save the question
    try {
      const response = await fetch('http://localhost:5000/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      console.log('Question saved:', data)
      toast.success('Data Submitted Successfully!')
      setFormData({
        topic: '',
        year: '',
        questionText: '',
        options: ['', '', '', ''],
        correctOption: '1',
        solution: '',
      })
    } catch (error) {
      console.error('Error saving question:', error)
      // Handle errors here
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto text-left shadow-md rounded px-8 pt-6 mt-20 pb-8 mb-4"
    >
      <Toaster />
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Topic:Z
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Year:
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Question Text:
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="questionText"
            value={formData.questionText}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Options:
        </label>
        {formData.options.map((option, index) => (
          <div key={index} className="mb-2 grid grid-cols-2">
            <label className="block text-gray-700 text-sm mb-1">
              Option {index + 1}:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name={`options[${index}]`}
              value={option}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Correct Option:
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="correctOption"
            value={formData.correctOption}
            onChange={handleChange}
          >
            {/* Add a placeholder option */}
            <option value="" disabled>
              Select Correct Option
            </option>
            {formData.options.map((option, index) => (
              <option key={index} value={index + 1}>
                Option {index + 1}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Solution:
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            name="solution"
            value={formData.solution}
            onChange={handleChange}
          ></textarea>
        </label>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default QuestionForm
