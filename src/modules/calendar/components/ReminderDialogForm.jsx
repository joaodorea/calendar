import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'

import SelectColorInput from './SelectColorInput.jsx'
import SelectTimeInput from './SelectTimeInput.jsx'

function ReminderDialogForm(props) {
  const [reminder, setReminder] = useState({
    date: null,
    color: '',
    city: '',
    message: '',
    time: '00:00',
  })

  useEffect(() => {
    if(props.reminder)
      setReminder(props.reminder)
    else
     setReminder({...reminder, date: props.date})
  }, [props.reminder])

  const handleInput = (elem) => {
    const {name, value} = elem.target

    setReminder({...reminder, [name]: value})
  }

  const handleDateInput = (elem) => {
    const value = elem.target.value
    const date = new Date(value.split('-'))
    setReminder({ ...reminder, date })
  }

  const formatDateToInput = (date) => {
    if(!date) return ''
    return date.toISOString().split('T')[0]
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.submit(reminder)

    return false;
  }

  const handleColorInput = (color) => setReminder({ ...reminder, color })
  const handleTimeInput = time => setReminder({ ...reminder, time })

  return (
      <Dialog open={true} onClose={props.close}>
        <Dialog.Panel>
          <Dialog.Title>{ props.title }</Dialog.Title>

          <Dialog.Description>
            <form onSubmit={handleSubmit}>
              <div className="base-field">
                <label htmlFor="date">Date <span>(mm / dd / yyyy)</span></label>
                <input onChange={handleDateInput} id="date" type="date" name="date" value={formatDateToInput(reminder.date)} required /><br />
              </div>

              <div className="base-field">
                <label htmlFor="time">Time</label>
                <SelectTimeInput onChange={handleTimeInput} selectedTime={reminder.time} />
              </div>

              <div className="base-field">
                <label htmlFor="city">City</label>
                <input id="city" aria-label="Select the city of the reminder" onChange={handleInput} value={reminder.city} type="text" name="city" placeholder="Eg. London" required /><br />
              </div>

              <div className="base-field">
                <label>Color</label>
                <SelectColorInput onChange={handleColorInput} selectedColor={reminder.color} />
              </div>

              <div className="base-field">
                <label htmlFor="message">Message <span>(Max: 30 char.)</span></label>
                <textarea
                  onChange={handleInput}
                  value={reminder.message}
                  type="text"
                  name="message"
                  id="message"
                  placeholder="message"
                  maxLength="30"
                  aria-label="Type the message of your reminder"
                  required
                /><br />
              </div>
              
              <button type="submit">Add Reminder</button>
            </form>
          </Dialog.Description>
        </Dialog.Panel>
      </Dialog>
  )
}

export default ReminderDialogForm
