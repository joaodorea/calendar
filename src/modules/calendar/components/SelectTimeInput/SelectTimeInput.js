import PropTypes from "prop-types";
import { Fragment } from "react";
import { Listbox } from "@headlessui/react";
import "./SelectTimeInput.css";
import { selectTimeOptions } from "../../utils/constants";

const SelectTimeInput = ({ onChange, selectedTime }) => (
  <div className="listbox-wrapper">
    <Listbox value={selectedTime} onChange={onChange}>
      <Listbox.Button as={Fragment}>
        <input
          data-testid="time-select-input"
          id="time"
          value={selectedTime}
          readOnly
        />
      </Listbox.Button>

      <Listbox.Options>
        {selectTimeOptions.map((time) => (
          <Listbox.Option key={time} value={time}>
            {time}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  </div>
);

SelectTimeInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedTime: PropTypes.string.isRequired,
};

export default SelectTimeInput;
