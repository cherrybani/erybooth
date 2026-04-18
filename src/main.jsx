import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
<<<<<<< HEAD
import { BrowserRouter } from 'react-router-dom'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
=======
import './index.css'
import { HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
>>>>>>> 70a71424ea950b6a4167eb967ebe60411b7c2703
)
