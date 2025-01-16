import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import DashboardHeader from './DashboardHeader'

function Incident() {
  const navigate = useNavigate()
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [attachment, setAttachment] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const session = await supabase.auth.getSession()
      if (!session.data.session) throw new Error('No user logged in')

      let attachmentUrl = null
      if (attachment) {
        const fileExt = attachment.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const { error: uploadError } = await supabase.storage
          .from('incident-attachments')
          .upload(fileName, attachment)

        if (uploadError) throw uploadError

        const { data } = supabase.storage
          .from('incident-attachments')
          .getPublicUrl(fileName)

        attachmentUrl = data.publicUrl
      }

      const { error } = await supabase
        .from('incidents')
        .insert([
          {
            user_id: session.data.session.user.id,
            description,
            location,
            attachment_url: attachmentUrl
          }
        ])

      if (error) throw error
      alert('Incident recorded successfully!')
      navigate('/')
    } catch (error) {
      alert('Error recording incident: ' + error.message)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <DashboardHeader title="Incident" />
      
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#FF5722] transition duration-300"
            rows="4"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Location (Optional)</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#FF5722] transition duration-300"
            placeholder="Enter location"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Attachment (Optional)</label>
          <input
            type="file"
            onChange={(e) => setAttachment(e.target.files[0])}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#FF5722] transition duration-300"
            accept="image/*,.pdf,.doc,.docx"
          />
        </div>

        <button
          type="submit"
          className="bg-[#FF5722] text-white px-6 py-3 rounded font-bold hover:bg-[#f4511e] transition duration-300"
        >
          Record Incident
        </button>
      </form>
    </div>
  )
}

export default Incident
