/**
 * @fileoverview Root application component for Kinetic Arena.
 * Configures client-side routing via React Router DOM and wraps
 * the entire component tree in an ErrorBoundary for graceful
 * error handling. All authenticated pages share a common Layout
 * component with sidebar navigation.
 *
 * Route structure:
 * - `/`            → Redirects to `/login`
 * - `/login`       → TicketLogin (authentication gate)
 * - `/dashboard`   → LiveDashboard (live match scores)
 * - `/venue`       → VenueNavigator (interactive stadium map)
 * - `/meetup`      → MeetupHub (group chat and squad status)
 * - `/concessions` → SmartConcessions (food ordering)
 * - `*`            → NotFound (404 error page)
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import TicketLogin from './pages/TicketLogin';
import LiveDashboard from './pages/LiveDashboard';
import VenueNavigator from './pages/VenueNavigator';
import MeetupHub from './pages/MeetupHub';
import SmartConcessions from './pages/SmartConcessions';
import NotFound from './pages/NotFound';

/**
 * The root App component that defines the application's routing structure.
 * Wrapped in an ErrorBoundary to catch and display unhandled rendering errors.
 *
 * @returns The rendered application with routing and error boundary.
 */
function App(): React.JSX.Element {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<TicketLogin />} />
          {/* All authenticated pages share the Layout with sidebar/header/bottom-nav */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<LiveDashboard />} />
            <Route path="/venue" element={<VenueNavigator />} />
            <Route path="/meetup" element={<MeetupHub />} />
            <Route path="/concessions" element={<SmartConcessions />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
