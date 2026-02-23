import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import VarahaswamyLanding from './Home'
import {
  BookingPolicy,
  PrivacyPolicy,
  TermsConditions,
  CancellationPolicy
} from "./PoliciesFiles";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VarahaswamyLanding />} />
        <Route path="/policy/booking" element={<BookingPolicy />} />
        <Route path="/policy/privacy" element={<PrivacyPolicy />} />
        <Route path="/policy/terms" element={<TermsConditions />} />
        <Route path="/policy/cancellation" element={<CancellationPolicy />} />
      </Routes>
    </Router>
  )
}

export default App
