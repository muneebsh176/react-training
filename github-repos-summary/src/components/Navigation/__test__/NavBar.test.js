import React from "react"
import NavBar from '../NavBar'
import { BrowserRouter } from "react-router-dom"
import { render } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"

test('main header renders with correct text', () => {
    const { getByText } = render(<BrowserRouter><NavBar /></BrowserRouter>)
    const mainHeaderEl = getByText("GitHub Repos Summary")
    expect(mainHeaderEl).toBeDefined();
});
