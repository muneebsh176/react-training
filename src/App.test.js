import React from 'react'
import App from './App'
import { fireEvent, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

test('authentication error is rendered', async () => {
  const { getByTestId } = render(<App />)

  const username = getByTestId('username-field')
  const password = getByTestId('password-field')

  fireEvent.change(username, { target: { value: 'abc123' } })
  fireEvent.change(password, { target: { value: 'def123' } })

  const loginBtnEl = getByTestId('login-btn')
  fireEvent.submit(loginBtnEl)

  const alertEl = await waitFor(() => getByTestId('auth-error'))
  expect(alertEl).toBeDefined()
})

test('render navigation bar on successfull authentication', async () => {
  const { getByTestId, getByText } = render(<App />)

  const username = getByTestId('username-field')
  const password = getByTestId('password-field')

  fireEvent.change(username, { target: { value: 'muneeb706' } })
  fireEvent.change(password, { target: { value: 'admin123' } })

  const loginBtnEl = getByTestId('login-btn')
  fireEvent.submit(loginBtnEl)

  const alertEl = await waitFor(() => getByText('Commits'))
  expect(alertEl).toBeDefined()
})
