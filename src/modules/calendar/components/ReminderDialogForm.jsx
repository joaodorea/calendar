import { useState } from 'react'
import { Dialog } from '@headlessui/react'

function ReminderDialogForm(props) {
  const [color, setColor] = useState('')
  const [city, setCity] = useState('')
  const [message, setMessage] = useState('')
  const [time, setTime] = useState('')

  return (
      <Dialog open={props.isOpen} onClose={props.close}>
        <Dialog.Panel>
          <Dialog.Title>Deactivate account</Dialog.Title>

          <Dialog.Description>
            <input onChange={e => setMessage(e.target.value)} type="text" name="message" placeholder="message" /><br />
            <input onChange={e => setCity(e.target.value)} type="text" name="city" placeholder="city" /><br />
            <input onChange={e => setColor(e.target.value)} type="text" name="color" placeholder="color" /><br />

            
            <select name="time" value={time} onChange={e => setTime(e.target.value)}>
              <option value="00:00">00:00</option>
              <option value="12:12">12:12</option>
              <option value="24:24">24:24</option>
            </select>
          </Dialog.Description>

          <button onClick={() => props.submit({color, city, time, message})}>Save</button>
        </Dialog.Panel>
      </Dialog>
  )
}

export default ReminderDialogForm
