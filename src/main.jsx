import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CVProvider } from './context/CVContext.jsx' // ইম্পোর্ট করো

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CVProvider>
      <App />
    </CVProvider>
  </React.StrictMode>,
)