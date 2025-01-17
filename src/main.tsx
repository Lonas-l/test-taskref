import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.scss';
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter basename="/test-taskref">
          <App />
      </BrowserRouter>
  </StrictMode>,
)
