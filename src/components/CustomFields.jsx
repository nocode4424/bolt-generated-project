import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

function CustomFields() {
  const [fields, setFields] = useState([])
  const [newFieldName, setNewFieldName] = useState('')

  useEffect(() => {
    fetchCustomFields()
  }, [])

  const fetchCustomFields = async () => {
    const { data, error } = await supabase
      .from('custom_journal_fields')
      .select('*')
      .eq('user_id', supabase.auth.user().id)

    if (error) {
      console.error('Error fetching custom fields:', error)
    } else {
      setFields(data)
    }
  }

  const addCustomField = async () => {
    if (newFieldName.trim() === '') return

    const { data, error } = await supabase
      .from('custom_journal_fields')
      .insert([
        { user_id: supabase.auth.user().id, name: newFieldName.trim() }
      ])

    if (error) {
      console.error('Error adding custom field:', error)
    } else {
      setNewFieldName('')
      fetchCustomFields()
    }
  }

  const deleteCustomField = async (id) => {
    const { error } = await supabase
      .from('custom_journal_fields')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting custom field:', error)
    } else {
      fetchCustomFields()
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Custom Fields</h2>
      <div className="mb-4 flex">
        <input
          type="text"
          value={newFieldName}
          onChange={(e) => setNewFieldName(e.target.value)}
          className="flex-grow p-2 border rounded-l"
          placeholder="New custom field name"
        />
        <button
          onClick={addCustomField}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          Add Field
        </button>
      </div>
      <ul className="space-y-2">
        {fields.map((field) => (
          <li key={field.id} className="flex justify-between items-center p-2 bg-gray-100 rounded">
            <span>{field.name}</span>
            <button
              onClick={() => deleteCustomField(field.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CustomFields
