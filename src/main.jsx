import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthcontextProvider   from "@/context/Authcontext"
import { EdgeStoreProvider } from "@/lib/edgestore"
import axios from 'axios'

axios.defaults.baseURL= "http://localhost:5000"
axios.defaults.withCredentials = true
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthcontextProvider>
      <EdgeStoreProvider basePath="http://localhost:5000/edgestore">
          <App />
      </EdgeStoreProvider>
        
    </AuthcontextProvider>

  </React.StrictMode>,
)
