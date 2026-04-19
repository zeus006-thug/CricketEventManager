/**
 * @fileoverview Root application component for Kinetic Arena.
 * Configures client-side routing, authentication guards, and error handling.
 *
 * Security architecture:
 * - All routes except `/login` are wrapped in a `ProtectedRoute` guard.
 * - The `AuthProvider` manages session state with `sessionStorage` (tab-scoped).
 * - Rate limiting prevents brute-force login attempts.
 * - Session timeout automatically expires inactive sessions after 30 minutes.
 * - The `ErrorBoundary` catches unhandled rendering errors gracefully.
 *
 * Route structure:
 * - `/`            → Redirects to `/login`
 * - `/login`       → TicketLogin (public, authentication gate)
 * - `/dashboard`   → LiveDashboard (protected)
 * - `/venue`       → VenueNavigator (protected)
 * - `/meetup`      → MeetupHub (protected)
 * - `/concessions` → SmartConcessions (protected)
 * - `*`            → NotFound (public, 404 error page)
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import TicketLogin from './pages/TicketLogin';
import LiveDashboard from './pages/LiveDashboard';
import VenueNavigator from './pages/VenueNavigator';
import MeetupHub from './pages/MeetupHub';
import SmartConcessions from './pages/SmartConcessions';
import NotFound from './pages/NotFound';

/**
 * The root App component that defines the application's routing and security structure.
 * Wrapped in ErrorBoundary → AuthProvider → BrowserRouter to ensure proper
 * error handling and authentication state are available to all routes.
 *
 * @returns The rendered application with routing, auth, and error boundary.
 */
function App(): React.JSX.Element {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<TicketLogin />} />
            {/* All routes below require authentication */}
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<LiveDashboard />} />
                <Route path="/venue" element={<VenueNavigator />} />
                <Route path="/meetup" element={<MeetupHub />} />
                <Route path="/concessions" element={<SmartConcessions />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
