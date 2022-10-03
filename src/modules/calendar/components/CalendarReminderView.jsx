import { useState } from 'react'
import { Dialog } from '@headlessui/react'

function ReminderDialogForm(props) {
  const [reminder] = useState(props.reminder)

  return (
      <Dialog open={true} onClose={props.close}>
        <Dialog.Panel>
          <Dialog.Title>See reminder</Dialog.Title>

          <Dialog.Description>
            <p>{ reminder.date.getTime() }, { reminder.time } <span style={{ backgroundColor: reminder.color, width: '1rem', height: '1rem', borderRadius: '50%', display: 'inline-block' }}></span></p>
            <p>{ reminder.message }</p>
            <p>{ reminder.city }</p>
          </Dialog.Description>

          <button onClick={() => props.editReminder(reminder)}>Edit Reminder</button>
        </Dialog.Panel>
      </Dialog>
  )
}

export default ReminderDialogForm
