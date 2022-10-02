import {useState} from 'react'
import ReminderDialogForm from '../components/ReminderDialogForm.jsx'

function Calendar() {
  let [reminders, setReminder] = useState([])
  let [dateId, setDateId] = useState('')

  const currentMonth = new Date().getMonth()
  const totalDaysInMonth = new Date(2022, currentMonth + 1, 0).getDate()
  const remainingDays = 6 - new Date(2022, currentMonth, totalDaysInMonth).getDay()
  const totalDays = totalDaysInMonth + remainingDays

  const diff = 0 - (new Date(2022, currentMonth, 1).getDay()) + 1
  const weeks = []

  const saveReminder = (reminder) => {
    setReminder([...reminders, {
      date: dateId,
      ...reminder,
    }])

    setDateId('')
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
                {messages.length ? messages.map(({message}) => 
                  <span className="date-item-reminder">{message}</span>)
                : null}
              </div>
            </span>
          )
        })}
      </div>

      <ReminderDialogForm 
        isOpen={dateId !== ''}
        close={() => setDateId('')}
        submit={saveReminder}
      />
    </div>
  )
}

export default Calendar
