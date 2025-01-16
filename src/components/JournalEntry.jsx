import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import DashboardHeader from './DashboardHeader'

const moodOptions = ['😊', '😐', '😔', '😫', '😴']
const stressLevels = ['Low', 'Medium', 'High']

function JournalEntry() {
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [highlights, setHighlights] = useState('')
  const [mood, setMood] = useState('')
  const [stressLevel, setStressLevel] = useState('')
  const [customFields, setCustomFields] = useState([])
  const [customValues, setCustomValues] = useState({})

  useEffect(() => {
    fetchCustomFields()
  }, [])

  const fetchCustomFields = async () => {
    try {
      const session = await supabase.auth.getSession()
      if (!session.data.session) return

      const { data, error } = await supabase
        .from('custom_journal_fields')
        .select('*')
        .eq('user_id', session.data.session.user.id)

      if (error) throw error
      setCustomFields(data || [])
      
      const initialValues = {}
      data?.forEach(field => {
        initialValues[field.id] = ''
      })
      setCustomValues(initialValues)
    } catch (error) {
      console.error('Error fetching custom fields:', error)
    }
  }

  const handleCustomFieldChange = (id, value) => {
    setCustomValues(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const session = await supabase.auth.getSession()
      if (!session.data.session) throw new Error('No user logged in')

      const { error } = await supabase
        .from('journal_entries')
        .insert([
          {
            user_id: session.data.session.user.id,
            content,
            highlights,
            mood,
            stress_level: stressLevel,
            custom_fields: customValues
          },
        ])

      if (error) throw error
      alert('Journal entry added successfully!')
      navigate('/')
    } catch (error) {
      alert('Error adding journal entry: ' + error.message)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <DashboardHeader title="Journal Entry" />
      
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
        <div>
          <label className="block mb-1 font-medium">Journal Entry</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#4CAF50] transition duration-300"
            rows="5"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Highlights (Optional)</label>
          <textarea
            value={highlights}
            onChange={(e) => setHighlights(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#4CAF50] transition duration-300"
            rows="3"
          ></textarea>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Mood (Optional)</label>
            <div className="flex space-x-2">
              {moodOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setMood(option)}
                  className={`p-2 border rounded text-2xl transition duration-300 ${mood === option ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-100'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">Stress Level (Optional)</label>
            <div className="flex space-x-2">
              {stressLevels.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setStressLevel(level)}
                  className={`p-2 border rounded transition duration-300 ${stressLevel === level ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-100'}`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {customFields.map((field) => (
          <div key={field.id}>
            <label className="block mb-1 font-medium">{field.name} (Optional)</label>
            <input
              type="text"
              value={customValues[field.id] || ''}
              onChange={(e) => handleCustomFieldChange(field.id, e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-[#4CAF50] transition duration-300"
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-[#4CAF50] text-white px-6 py-3 rounded font-bold hover:bg-[#45a049] transition duration-300"
        >
          Add Journal Entry
        </button>
      </form>
    </div>
  )
}

export default JournalEntry
