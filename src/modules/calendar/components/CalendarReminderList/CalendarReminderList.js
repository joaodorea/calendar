import "./CalendarReminderList.css";

const CalendarReminderList = ({ reminders, selectReminder }) => (
  <div className="reminder-list">
    {Boolean(reminders.length)
      ? reminders.map((reminder) => {
          const isColoredReminder = reminder.color
            ? "reminder-item-colored"
            : "";
          const backgroundStyle = reminder.color
            ? { backgroundColor: reminder.color }
            : {};

          return (
            <span
              key={reminder.id}
              role="button"
              style={backgroundStyle}
              onClick={() => selectReminder(reminder)}
              className={`date-item-reminder ${isColoredReminder}`}
            >
              {reminder.time}, {reminder.message}
            </span>
          );
        })
      : null}
  </div>
);

export default CalendarReminderList;
