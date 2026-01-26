import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import VarahaswamyLanding from './Home'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VarahaswamyLanding />} />
      </Routes>
    </Router>
  )
}

export default App