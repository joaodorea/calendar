// import {useState} from 'react'

function Calendar() {
  const currentMonth = new Date().getMonth()
  const totalDaysInMonth = new Date(2022, currentMonth + 1, 0).getDate()
  const remainingDays = 6 - new Date(2022, currentMonth, totalDaysInMonth).getDay()
  const totalDays = totalDaysInMonth + remainingDays

  const diff = 0 - (new Date(2022, currentMonth, 1).getDay()) + 1
  const weeks = []

  const selectDate = (date) => console.log(date)

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
    <div>
      <div>Calendar</div>
      {weeks.map(w => 
        <>
          <span className="date-item" onClick={() => selectDate(w.date)}>{w.day} </span>
          {w.weekDay === 6 && <br />}
        </>
      )}
    </div>
  )
}

export default Calendar
