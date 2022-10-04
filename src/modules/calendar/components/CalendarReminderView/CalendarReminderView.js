import { Fragment } from "react";
import { Dialog } from "@headlessui/react";

import { formatDateToView } from "../../utils/helpers";
import "./CalendarReminderView.css";

const CalendarReminderView = ({ close, editReminder, reminder }) => (
  <Dialog open={true} onClose={close}>
    <Dialog.Panel>
      <Dialog.Title as={Fragment}>
        <h2 className="dialog-title">See reminder details</h2>
      </Dialog.Title>

      <Dialog.Description>
        <p className="reminder-view-item">
          {formatDateToView(reminder.date)}, {reminder.time}{" "}
          <span
            className="calendar-view-colored-dot"
            style={{ backgroundColor: reminder.color }}
          ></span>
        </p>
        <p className="reminder-view-item">{reminder.message}</p>
        <p className="reminder-view-item">{reminder.city}</p>
      </Dialog.Description>

      <button
        className="dialog-button-edit-reminder"
        onClick={() => editReminder(reminder)}
      >
        Edit Reminder
      </button>
    </Dialog.Panel>
  </Dialog>
);

export default CalendarReminderView;
