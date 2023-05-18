import React from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import 'primereact/resources/themes/viva-dark/theme.css' //theme
import 'primereact/resources/primereact.min.css' //core css
// import 'primeicons/primeicons.css' //icons
// import 'primeflex/primeflex.css' // flex
import './static/css/index.scss'

const container = document.getElementById('root')
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(container!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  </React.StrictMode>,
)
