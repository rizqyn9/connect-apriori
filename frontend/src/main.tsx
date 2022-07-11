import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import './static/css/index.scss'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

const container = document.getElementById('root')
createRoot(container!).render(
    <React.StrictMode>
        {/* <Helmet>
        <title>Dashboard</title>
    </Helmet> */}
        <Router>
            <App />
            {/* <div>a</div> */}
        </Router>
    </React.StrictMode>,
)
