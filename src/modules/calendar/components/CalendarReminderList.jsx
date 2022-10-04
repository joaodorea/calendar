function CalendarReminderList (props) {
  return (
    <div className="reminder-list">
      {Boolean(props.reminders.length) ? props.reminders.map((reminder) => {
        const isColoredReminder = reminder.color ? 'reminder-item-colored' : ''
        const backgroundStyle = reminder.color ? {'backgroundColor': reminder.color} : {}

        return (
          <span
            key={reminder.id}
            role="button"
            style={backgroundStyle}
            onClick={() => props.selectReminder(reminder)}
            className={`date-item-reminder ${isColoredReminder}`}
          >
              {reminder.time}, {reminder.message}
          </span>
        )
      }) : null}
    </div>
  )
}

export default CalendarReminderList
