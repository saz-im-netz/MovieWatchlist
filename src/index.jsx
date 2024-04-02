import React from 'react'
import ReactDOM from 'react-dom/client'

import './css/index.css'
import SearchList from './pages/SearchList'

function App() {

  return (
    <SearchList />
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <App />
)
