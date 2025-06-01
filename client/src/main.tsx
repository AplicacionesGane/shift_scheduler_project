import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { RouterMain } from './routes'
import { ShiftsProvider } from './contexts/ShiftsContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ShiftsProvider>
      <RouterProvider router={RouterMain} />
    </ShiftsProvider>
  </StrictMode>,
)
