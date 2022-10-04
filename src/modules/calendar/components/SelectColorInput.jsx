function SelectColorInput(props) {
  const availableColor = [
    '#4285f4',
    '#616161',
    '#d50000',
    '#e67c73',
    '#f4511e',
    '#f6bf26',
    '#33b679',
    '#0b8043',
    '#039be5',
    '#3f51b5',
    '#7986cb',
    '#8e24aa',
  ]

  return (
    <div className="select-colors">
      {availableColor.map(color => {
        const isColorSelectedClass = color === props.selectedColor ? 'is-selected' : ''

        return (
          <span key={color} onClick={() => props.onChange(color)} style={{ 'backgroundColor': color }} className={`color-item ${isColorSelectedClass}`}></span>
        )
      })}
    </div>
  )
}

export default SelectColorInput
