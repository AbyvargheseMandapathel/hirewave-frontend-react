import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-quill/dist/quill.snow.css' // Import Quill's default styles
import './styles/quill-custom.css' // Import our custom Quill styles
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)