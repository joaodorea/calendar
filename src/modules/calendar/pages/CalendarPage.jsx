import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import ReminderDialogForm from '../components/ReminderDialogForm.jsx'
import { getCityWeatherInDate } from '../network/calendar.api.js'

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

  const saveReminder = async (reminder) => {
    const weather = await getWeatherReminder(reminder.city, reminder.date)

    if(weather)
      reminder.weather = weather.main

    setReminderList(sortReminderByTime([...reminders, {
      id: uuidv4(),
      ...reminder,
    }]))

    setDateId('')
  }

  const getWeatherReminder = (date, city) => {
    getCityWeatherInDate(date, city)
  }

  const editReminder = (reminder) => {
    const weather = getWeatherReminder(reminder.city, reminder.date)
    if(weather)
      reminder.weather = weather.main

    const reminderList = reminders.filter((r) => r.id !== reminder.id)
    reminderList.push(reminder)

    setReminderList(sortReminderByTime(reminderList))
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

  const sortReminderByTime = (reminders) => {
    return [...reminders].sort((a, b) => {
      const parsedTimeA = parseFloat(a.time.replace(':', '.'))
      const parsedTimeB = parseFloat(b.time.replace(':', '.'))

      if(parsedTimeA > parsedTimeB) return 1
      else return -1
    })
  }

  return (
    <div className="calendar-page">
      <div>Calendar</div>

      <div className="calendar">
        <span className="calendar-header-item">Sunday</span>
        <span className="calendar-header-item">Monday</span>
        <span className="calendar-header-item">Tuesday</span>
        <span className="calendar-header-item">Wednesday</span>
        <span className="calendar-header-item">Thursday</span>
        <span className="calendar-header-item">Friday</span>
        <span className="calendar-header-item">Saturday</span>

        {weeks.map(w => {
          const messages = reminders.filter(({date}) => +date === +w.date)
          const isHolidayClassName = w.weekDay === 0 || w.weekDay === 6 ? 'is-holiday' : ''
          const isCurrentMonthClassName = w.isCurrentMonth ? '' : 'not-current-month'

          return (
            <span className={`date-item ${isHolidayClassName} ${isCurrentMonthClassName}`}>
              <div className="date-item-title" onClick={() => setDateId(w.date)}>
                {w.day}
              </div>

              <div className="reminder-list">
                {Boolean(messages.length) ? messages.map((reminder) => {
                  const isColoredReminder = reminder.color ? 'reminder-item-colored' : ''
                  const backgroundStyle = reminder.color ? {'backgroundColor': reminder.color} : {}

                  return (
                    <span
                      style={backgroundStyle}
                      onClick={() => setEditingReminder(reminder)}
                      className={`date-item-reminder ${isColoredReminder}`}>
                        {reminder.time}, {reminder.message}
                    </span>
                  )
                }) : null}
              </div>
            </span>
          )
        })}
      </div>

      {Boolean(dateId) && 
        <ReminderDialogForm 
          date={dateId}
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
