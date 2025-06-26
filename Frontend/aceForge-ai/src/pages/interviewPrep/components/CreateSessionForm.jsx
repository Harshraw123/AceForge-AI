import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axiosInstance from '../../../utils/axiosInstance'
import { API_PATHS } from '../../../utils/apiPath'
import { ClipLoader } from 'react-spinners'

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: '',
    experience: '',
    topicsToFocus: '',
    description: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role: formData.role,
        experience: formData.experience,
        topicsToFocus: formData.topicsToFocus,
        description:formData.description,
        numberOfQuestions: 8,
      })

      const generatedQuestions = aiResponse.data
      console.log("fuck",aiResponse.data)

      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      })

      if (response.data.session?._id) {
        navigate(`/interview-prep/${response.data.session._id}`)
      }
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-6 sm:p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Create AceForge AI Session
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Role</label>
          <input
            type="text"
            name="role"
            placeholder="e.g., Frontend Developer"
            value={formData.role}
            onChange={handleChange}
            className="w-full border text-black font-bold border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
          <input
            type="text"
            name="experience"
            placeholder="e.g., 2 years"
            value={formData.experience}
            onChange={handleChange}
            className="w-full border  text-black font-bold border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium  text-gray-700 mb-1">Topics to Focus On</label>
          <input
            type="text"
            name="topicsToFocus"
            placeholder="e.g., React, Node.js"
            value={formData.topicsToFocus}
            onChange={handleChange}
            className="w-full border  text-black font-bold border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Any specific goals for this session"
            value={formData.description}
            onChange={handleChange}
            className="w-full border  text-black font-bold  border-gray-300 rounded-lg px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-yellow-400 text-center text-white font-medium py-2 px-4 rounded-lg hover:bg-yellow-700  transition disabled:opacity-50"
        >
          {isLoading ? <ClipLoader color="#ffffff" size={20} /> : 'Create Session'}
        </button>
      </form>
    </div>
  )
}

export default CreateSessionForm
