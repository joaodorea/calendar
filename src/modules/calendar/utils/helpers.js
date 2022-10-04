export function getDaysInMonth() {
  const currentMonth = new Date().getMonth()
  const totalDaysInMonth = new Date(2022, currentMonth + 1, 0).getDate()
  const remainingDays = 6 - new Date(2022, currentMonth, totalDaysInMonth).getDay()
  const totalDays = totalDaysInMonth + remainingDays

  const diff = 0 - (new Date(2022, currentMonth, 1).getDay()) + 1
  const days = []

  for(let i = diff; i <= totalDays; i ++) {
    const currentDate = new Date(2022, currentMonth, i)

    days.push({
      date: currentDate,
      day: currentDate.getDate(),
      weekDay: currentDate.getDay(),
      isCurrentMonth: currentDate.getMonth() === currentMonth,
    })
  }

  return days
}

export function sortReminderByTime(reminders) {
  return [...reminders].sort((a, b) => {
    const parsedTimeA = parseFloat(a.time.replace(':', '.'))
    const parsedTimeB = parseFloat(b.time.replace(':', '.'))

    if(parsedTimeA > parsedTimeB) return 1
    else return -1
  })
}
