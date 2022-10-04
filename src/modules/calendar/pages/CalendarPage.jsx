import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import ReminderDialogForm from '../components/ReminderDialogForm.jsx'
import ReminderView from '../components/CalendarReminderView.jsx'
import CalendarHeader from '../components/CalendarHeader.jsx'
import ReminderList from '../components/CalendarReminderList.jsx'
import { getDaysInMonth, sortReminderByTime } from '../utils/helpers.js'
import { getCityWeatherInDate } from '../network/calendar.api.js'

function Calendar() {
  let [reminders, setReminderList] = useState([])
  let [editingReminder, setEditingReminder] = useState(null)
  let [viewingReminder, setViewingReminder] = useState(null)
  let [dateId, setDateId] = useState('')
  const days = getDaysInMonth()

  const saveReminder = async (reminder) => {
    const weather = await getCityWeatherInDate(reminder.city, reminder.date)

    if(weather)
      reminder.weather = weather.main

    setReminderList(sortReminderByTime([...reminders, {
      id: uuidv4(),
      ...reminder,
    }]))

    setDateId('')
  }

  const editReminder = async (reminder) => {
    const weather = await getCityWeatherInDate(reminder.city, reminder.date)
    if(weather)
      reminder.weather = weather.main

    const reminderList = reminders.filter((r) => r.id !== reminder.id)
    reminderList.push(reminder)

    setReminderList(sortReminderByTime(reminderList))
    setEditingReminder(null)
  }


  const handleEditAction = (reminder) => {
    setViewingReminder(null)
    setEditingReminder(reminder)
  }

  return (
    <div className="calendar-page">
      <div>Calendar</div>

      <div className="calendar" role="grid">
        <CalendarHeader />

        {days.map(day => {
          const reminderList = reminders.filter(({date}) => +date === +day.date)
          const isHolidayClassName = day.weekDay === 0 || day.weekDay === 6 ? 'is-holiday' : ''
          const isCurrentMonthClassName = day.isCurrentMonth ? '' : 'not-current-month'

          return (
            <span role="gridcell" key={day.date.getTime()} className={`date-item ${isHolidayClassName} ${isCurrentMonthClassName}`}>
              <div className="date-item-title" onClick={() => setDateId(day.date)}>
                {day.day}
              </div>

              <ReminderList selectReminder={setViewingReminder} reminders={reminderList} />
            </span>
          )
        })}
      </div>

      {Boolean(dateId) && 
        <ReminderDialogForm 
          title="Add new reminder"
          date={dateId}
          close={() => setDateId('')}
          submit={saveReminder}
        />
      }

      {Boolean(editingReminder) && 
        <ReminderDialogForm 
          title="Edit reminder"
          close={() => setEditingReminder(null)}
          submit={editReminder}
          reminder={editingReminder}
        />
      }

      {Boolean(viewingReminder) &&
        <ReminderView
          reminder={viewingReminder}
          close={() => setViewingReminder(null)}
          editReminder={handleEditAction}
        />
      }
    </div>
  )
}

export default Calendar
