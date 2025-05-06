import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './../public/css/input.css'
import App from './App.tsx'
import { AppProvider } from './core/providers/app-provider.tsx'
import Copyright from './components/Copyright.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <AppProvider>
      <App />
      <Copyright />
    </AppProvider>
  // </StrictMode>,
)
