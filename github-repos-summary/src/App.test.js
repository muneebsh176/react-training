import React from "react"
import App from './App'
import { render, fireEvent, waitFor } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"

test('Authentication error is rendered', async () => {
    const { getByTestId } = render(<App />)

    const username = getByTestId('username-field')
    const password = getByTestId('password-field')

    fireEvent.change(username, { target: { value: "abc123" } })
    fireEvent.change(password, { target: { value: "def123" } })

    const loginBtnEl = getByTestId("login-btn")
    fireEvent.submit(loginBtnEl)

    const alertEl = await waitFor(() => getByTestId('auth-error'))
    expect(alertEl).toBeDefined()
})