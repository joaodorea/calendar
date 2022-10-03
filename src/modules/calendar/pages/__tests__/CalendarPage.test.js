import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import CalendarPage from '../CalendarPage.jsx'

beforeEach(() => {
  // IntersectionObserver isn't available in test environment
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

test('should load all days in calendar correctly', async () => {
  render(<CalendarPage />)

  const items = await screen.findAllByRole('gridcell')
  expect(items).toHaveLength(42)
})

test('should open add dialog when day is clicked', async () => {
  render(<CalendarPage />)

  userEvent.click(screen.getAllByText('1')[0])

  const addReminderDialog = await screen.findByText('Add new reminder')
  expect(addReminderDialog).toBeVisible()

  const timeInput = screen.getByTestId('time-select-input')
  userEvent.click(timeInput)
  userEvent.click(screen.getByText('20:00'))

  const cityInput = screen.getByLabelText('City')
  userEvent.type(cityInput, 'Salvador')

  const messageInput = screen.getByLabelText(/Message/)
  userEvent.type(messageInput, 'Some message')

  const submitButton = screen.getByRole('button', { name: 'Add Reminder' })
  userEvent.click(submitButton)

  await waitFor(() => {
    expect(screen.queryByText('Add Reminder')).not.toBeInTheDocument()
  })

  const reminders = screen.getAllByRole('button', { name: /20:00/ })
  expect(reminders).toHaveLength(1)

  const firstReminder = screen.getByRole('button', { name: /20:00/ })
  userEvent.click(firstReminder)

  const seeReminderDialog = await screen.findByText('See reminder')
  expect(seeReminderDialog).toBeVisible()

  const editReminderButton = screen.getByRole('button', { name: 'Edit Reminder' })
  userEvent.click(editReminderButton)

  expect(editReminderButton).not.toBeInTheDocument()
  expect(screen.getByText('Edit reminder')).toBeVisible()

  const editMessageInput = screen.getByLabelText(/Message/)
  userEvent.type(editMessageInput, ' 123')
  userEvent.click(screen.getByRole('button', { name: 'Add Reminder' }))

  await waitFor(() => {
    expect(screen.queryByText('Edit reminder')).not.toBeInTheDocument()
  })

  expect(screen.getByText(/Some message 123/)).toBeInTheDocument()

  userEvent.click(screen.getAllByText('1')[0])
  const addNewReminderDialog = await screen.findByText('Add new reminder')
  expect(addNewReminderDialog).toBeVisible()

  const newCityInput = screen.getByLabelText('City')
  userEvent.type(newCityInput, 'Salvador')

  const newMessageInput = screen.getByLabelText(/Message/)
  userEvent.type(newMessageInput, 'Some message')

  const newSubmitButton = screen.getByRole('button', { name: 'Add Reminder' })
  userEvent.click(newSubmitButton)

  await waitFor(() => {
    expect(screen.queryByText('Add Reminder')).not.toBeInTheDocument()
  })

  const allReminders = screen.getAllByRole('button', { name: /:/ })
  expect(allReminders).toHaveLength(2)
  expect(allReminders[0].textContent).toContain('00:00')
  expect(allReminders[1].textContent).toContain('20:00')
})
