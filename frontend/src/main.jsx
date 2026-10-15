import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app.css'
import { App } from './App.jsx'

import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './features/auth/context/auth.context.jsx';
import { InterviewReportProvider } from './features/ai/context/interview.context.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <AuthProvider>
    <InterviewReportProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </InterviewReportProvider>
  </AuthProvider>
  // </StrictMode>
)
