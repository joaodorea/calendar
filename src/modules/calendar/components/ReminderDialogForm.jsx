import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'

function ReminderDialogForm(props) {
  const [reminder, setReminder] = useState({
    date: null,
    color: '',
    city: '',
    message: '',
    time: '',
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

  return (
      <Dialog open={true} onClose={props.close}>
        <Dialog.Panel>
          <Dialog.Title>Deactivate account</Dialog.Title>

          <Dialog.Description>
            <form onSubmit={handleSubmit}>
              <div className="base-field">
                <label>Date</label>
                <input onChange={handleDateInput} type="date" name="date" value={formatDateToInput(reminder.date)} required /><br />
              </div>

              <div className="base-field">
                <label>Message <span>(Max: 30 char.)</span></label>
                <input onChange={handleInput} value={reminder.message} type="text" name="message" placeholder="message" required /><br />
              </div>

              <div className="base-field">
                <label>City</label>
                <input onChange={handleInput} value={reminder.city} type="text" name="city" placeholder="city" required /><br />
              </div>

              <div className="base-field">
                <label>Color</label>
                <input onChange={handleInput} value={reminder.color} type="text" name="color" placeholder="color" /><br />
              </div>
              
              <div className="base-field">
                <label>Time</label>
                <select name="time" value={reminder.time} onChange={handleInput}>
                  <option value="00:00">00:00</option>
                  <option value="12:12">12:12</option>
                  <option value="24:24">24:24</option>
                </select>
              </div>

              <button type="submit">Save</button>
            </form>
          </Dialog.Description>
        </Dialog.Panel>
      </Dialog>
  )
}

export default ReminderDialogForm
