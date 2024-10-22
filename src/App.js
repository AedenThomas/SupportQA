// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import KeyBenefits from './components/KeyBenefits';
import HowItWorks from './components/HowItWorks';
import TryNowPage from './components/TryNowPage';
import TicketList from './components/TicketList';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <HeroSection />
              <KeyBenefits />
              <HowItWorks />
            </>
          } />
          <Route path="/try-now" element={<TryNowPage />} />
          <Route path="/try-now/:id?" element={<TryNowPage />} />
          <Route path="/tickets" element={<TicketList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
