import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'

function ReminderDialogForm(props) {
  const [reminder, setReminder] = useState({
    color: '',
    city: '',
    message: '',
    time: '',
  })

  useEffect(() => {
    if(props.reminder)
      setReminder(props.reminder)
  }, [props.reminder])

  const handleInput = (elem) => {
    const {name, value} = elem.target

    setReminder({...reminder, [name]: value})
  }

  return (
      <Dialog open={true} onClose={props.close}>
        <Dialog.Panel>
          <Dialog.Title>Deactivate account</Dialog.Title>

          <Dialog.Description>
            <input onChange={handleInput} value={reminder.message} type="text" name="message" placeholder="message" /><br />
            <input onChange={handleInput} value={reminder.city} type="text" name="city" placeholder="city" /><br />
            <input onChange={handleInput} value={reminder.color} type="text" name="color" placeholder="color" /><br />

            
            <select name="time" value={reminder.time} onChange={handleInput}>
              <option value="00:00">00:00</option>
              <option value="12:12">12:12</option>
              <option value="24:24">24:24</option>
            </select>
          </Dialog.Description>

          <button onClick={() => props.submit(reminder)}>Save</button>
        </Dialog.Panel>
      </Dialog>
  )
}

export default ReminderDialogForm
