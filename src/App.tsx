import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import TicketLogin from './pages/TicketLogin';
import LiveDashboard from './pages/LiveDashboard';
import VenueNavigator from './pages/VenueNavigator';
import MeetupHub from './pages/MeetupHub';
import SmartConcessions from './pages/SmartConcessions';

import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<TicketLogin />} />
        {/* All app pages share the Layout with sidebar/header/bottom-nav */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<LiveDashboard />} />
          <Route path="/venue" element={<VenueNavigator />} />
          <Route path="/meetup" element={<MeetupHub />} />
          <Route path="/concessions" element={<SmartConcessions />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
