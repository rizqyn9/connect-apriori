import React from 'react'
import ReactDOM from 'react-dom'
import './static/css/index.scss'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { Helmet } from 'react-helmet'

ReactDOM.render(
    <React.StrictMode>
        {/* <Helmet>
			<title>Dashboard</title>
		</Helmet> */}
        <Router>
            <App />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
)
