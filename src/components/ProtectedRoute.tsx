/**
 * @fileoverview ProtectedRoute component for the Kinetic Arena application.
 * Acts as a route guard that prevents unauthenticated users from accessing
 * protected pages. Redirects to the login page if the user is not authenticated.
 *
 * Security rationale:
 * Without this guard, users could bypass login by directly navigating to
 * URLs like `/dashboard` or `/concessions`. This component ensures that
 * every protected route checks authentication state before rendering.
 */

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute checks the user's authentication state via the AuthContext.
 * If the user is authenticated, it renders the child routes via `<Outlet />`.
 * If not, it redirects the user to the `/login` page, preserving no history
 * entry (using `replace`) to prevent back-button looping.
 *
 * @returns Either the `<Outlet />` for authenticated users, or a redirect to `/login`.
 *
 * @example
 * <Route element={<ProtectedRoute />}>
 *   <Route path="/dashboard" element={<LiveDashboard />} />
 * </Route>
 */
export default function ProtectedRoute(): React.JSX.Element {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
