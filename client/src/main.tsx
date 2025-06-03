import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { RouterMain } from './routes';
import { StrictMode } from 'react';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={RouterMain} />
  </StrictMode>,
)
