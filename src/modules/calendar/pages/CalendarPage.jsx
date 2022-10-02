import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ReminderDialogForm from '../components/ReminderDialogForm.jsx'

function Calendar() {
  let [reminders, setReminderList] = useState([])
  let [editingReminder, setEditingReminder] = useState(null)
  let [dateId, setDateId] = useState('')

  const currentMonth = new Date().getMonth()
  const totalDaysInMonth = new Date(2022, currentMonth + 1, 0).getDate()
  const remainingDays = 6 - new Date(2022, currentMonth, totalDaysInMonth).getDay()
  const totalDays = totalDaysInMonth + remainingDays

  const diff = 0 - (new Date(2022, currentMonth, 1).getDay()) + 1
  const weeks = []

  const saveReminder = (reminder) => {
    setReminderList([...reminders, {
      id: uuidv4(),
      date: dateId,
      ...reminder,
    }])

    setDateId('')
  }

  const editReminder = (reminder) => {
    const reminderList = reminders.filter((r) => r.id !== reminder.id)
    reminderList.push(reminder)

    setReminderList(reminderList)
    setEditingReminder(null)
  }

  for(let i = diff; i <= totalDays; i ++) {
    const currentDate = new Date(2022, currentMonth, i)

    weeks.push({
      date: currentDate,
      day: currentDate.getDate(),
      weekDay: currentDate.getDay(),
      isCurrentMonth: currentDate.getMonth() === currentMonth,
    })
  }

  return (
    <div className="calendar-page">
      <div>Calendar</div>

      <div className="calendar">
        {weeks.map(w => {
          // improve how dates are compared
          const messages = reminders.filter(({date}) => +date === +w.date)

          return (
            <span className="date-item">
              <div className="date-item-title" onClick={() => setDateId(w.date)}>
                {w.day}
              </div>

              <div className="reminder-list">
                {Boolean(messages.length) ? messages.map((reminder) => 
                  <span onClick={() => setEditingReminder(reminder)} className="date-item-reminder">{reminder.message}</span>)
                : null}
              </div>
            </span>
          )
        })}
      </div>

      {Boolean(dateId) && 
        <ReminderDialogForm 
          close={() => setDateId('')}
          submit={saveReminder}
        />
      }

      {Boolean(editingReminder) && 
        <ReminderDialogForm 
          close={() => setEditingReminder(null)}
          submit={editReminder}
          reminder={editingReminder}
        />
      }
    </div>
  )
}

export default Calendar
