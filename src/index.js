import React from 'react'
import './index.css'
import App from './App'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <React.Fragment>
    <App />
  </React.Fragment>
)
