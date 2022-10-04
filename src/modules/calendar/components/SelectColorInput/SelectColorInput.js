import "./SelectColorInput.css";
import { availableColors } from "../../utils/constants";

const SelectColorInput = ({ onChange, selectedColor }) => (
  <div className="select-colors">
    {availableColors.map((color) => {
      const isColorSelectedClass = color === selectedColor ? "is-selected" : "";

      return (
        <span
          key={color}
          onClick={() => onChange(color)}
          style={{ backgroundColor: color }}
          className={`color-item ${isColorSelectedClass}`}
        ></span>
      );
    })}
  </div>
);

export default SelectColorInput;
