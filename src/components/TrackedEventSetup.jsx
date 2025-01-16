import React, { useState } from 'react'
import { supabase } from '../supabaseClient'

function TrackedEventSetup() {
  const [name, setName] = useState('')
  const [isScheduled, setIsScheduled] = useState(false)
  const [schedule, setSchedule] = useState([])
  const [outcomes, setOutcomes] = useState([{ label: 'N/A', color: '#808080' }])

  const handleAddSchedule = () => {
    setSchedule([...schedule, ''])
  }

  const handleScheduleChange = (index, value) => {
    const newSchedule = [...schedule]
    newSchedule[index] = value
    setSchedule(newSchedule)
  }

  const handleAddOutcome = () => {
    setOutcomes([...outcomes, { label: '', color: '#000000' }])
  }

  const handleOutcomeChange = (index, field, value) => {
    const newOutcomes = [...outcomes]
    newOutcomes[index][field] = value
    setOutcomes(newOutcomes)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = supabase.auth.user()
      
      // Insert tracked event definition
      const { data: definitionData, error: definitionError } = await supabase
        .from('tracked_event_definitions')
        .insert([
          {
            user_id: user.id,
            name,
            is_scheduled: isScheduled,
            schedule: isScheduled ? schedule : null,
          },
        ])
        .single()

      if (definitionError) throw definitionError

      // Insert outcomes
      const outcomesWithDefinitionId = outcomes.map(outcome => ({
        ...outcome,
        definition_id: definitionData.id,
      }))

      const { error: outcomesError } = await supabase
        .from('tracked_event_outcomes')
        .insert(outcomesWithDefinitionId)

      if (outcomesError) throw outcomesError

      alert('Tracked event set up successfully!')
      // Reset form or redirect
    } catch (error) {
      alert('Error setting up tracked event: ' + error.message)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Set Up Tracked Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">What would you like to track?</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">When does this happen?</label>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={!isScheduled}
                onChange={() => setIsScheduled(false)}
                className="form-radio"
              />
              <span className="ml-2">No Set Schedule</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                checked={isScheduled}
                onChange={() => setIsScheduled(true)}
                className="form-radio"
              />
              <span className="ml-2">Regular Schedule</span>
            </label>
          </div>
        </div>
        {isScheduled && (
          <div>
            <label className="block mb-1">Schedule (24-hour format)</label>
            {schedule.map((time, index) => (
              <input
                key={index}
                type="time"
                value={time}
                onChange={(e) => handleScheduleChange(index, e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />
            ))}
            <button type="button" onClick={handleAddSchedule} className="btn btn-ghost">
              Add Time Slot
            </button>
          </div>
        )}
        <div>
          <label className="block mb-1">Outcomes</label>
          {outcomes.map((outcome, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                value={outcome.label}
                onChange={(e) => handleOutcomeChange(index, 'label', e.target.value)}
                className="flex-grow p-2 border rounded"
                placeholder="Outcome label"
                required
              />
              <input
                type="color"
                value={outcome.color}
                onChange={(e) => handleOutcomeChange(index, 'color', e.target.value)}
                className="p-1 border rounded"
              />
            </div>
          ))}
          <button type="button" onClick={handleAddOutcome} className="btn btn-ghost">
            Add Outcome
          </button>
        </div>
        <button type="submit" className="btn btn-primary">
          Set Up Tracked Event
        </button>
      </form>
    </div>
  )
}

export default TrackedEventSetup
