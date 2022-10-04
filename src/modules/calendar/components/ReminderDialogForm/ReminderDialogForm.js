import { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Dialog } from "@headlessui/react";

import SelectColorInput from "../SelectColorInput";
import SelectTimeInput from "../SelectTimeInput";
import "./ReminderDialogForm.css";

const ReminderDialogForm = ({ close, date, reminder, submit, title }) => {
  const [newReminder, setNewReminder] = useState({
    date: null,
    color: "",
    city: "",
    message: "",
    time: "00:00",
  });

  useEffect(() => {
    if (reminder) setNewReminder(reminder);
    else setNewReminder({ ...newReminder, date: date });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reminder]);

  const handleInput = (elem) => {
    const { name, value } = elem.target;

    setNewReminder({ ...newReminder, [name]: value });
  };

  const handleDateInput = (elem) => {
    const value = elem.target.value;
    const date = new Date(value.split("-"));
    setNewReminder({ ...newReminder, date });
  };

  const formatDateToInput = (date) => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(newReminder);

    return false;
  };

  const handleColorInput = (color) => setNewReminder({ ...newReminder, color });
  const handleTimeInput = (time) => setNewReminder({ ...newReminder, time });

  return (
    <Dialog open={true} onClose={close}>
      <Dialog.Panel>
        <Dialog.Title as={Fragment}>
          <h2 className="dialog-title">{title}</h2>
        </Dialog.Title>

        <Dialog.Description>
          <form onSubmit={handleSubmit}>
            <div className="base-field">
              <label htmlFor="date">
                Date <span>(mm / dd / yyyy)</span>
              </label>
              <input
                onChange={handleDateInput}
                id="date"
                type="date"
                name="date"
                value={formatDateToInput(newReminder.date)}
                required
              />
              <br />
            </div>

            <div className="base-field">
              <label htmlFor="time">Time</label>
              <SelectTimeInput
                onChange={handleTimeInput}
                selectedTime={newReminder.time}
              />
            </div>

            <div className="base-field">
              <label htmlFor="city">City</label>
              <input
                id="city"
                aria-label="Select the city of the reminder"
                onChange={handleInput}
                value={newReminder.city}
                type="text"
                name="city"
                placeholder="Eg. London"
                required
              />
              <br />
            </div>

            <div className="base-field">
              <label>Color</label>
              <SelectColorInput
                onChange={handleColorInput}
                selectedColor={newReminder.color}
              />
            </div>

            <div className="base-field">
              <label htmlFor="message">
                Message <span>(Max: 30 char.)</span>
              </label>
              <textarea
                onChange={handleInput}
                value={newReminder.message}
                type="text"
                name="message"
                id="message"
                placeholder="message"
                maxLength="30"
                aria-label="Type the message of your reminder"
                required
              />
              <br />
            </div>

            <button type="submit">Add Reminder</button>
          </form>
        </Dialog.Description>
      </Dialog.Panel>
    </Dialog>
  );
};

ReminderDialogForm.propTypes = {
  close: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  reminder: PropTypes.shape({
    date: null,
    color: PropTypes.string,
    city: PropTypes.string,
    message: PropTypes.string,
    time: PropTypes.string,
  }),
};

export default ReminderDialogForm;
