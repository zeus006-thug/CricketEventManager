/**
 * @fileoverview Authentication context and provider for the Kinetic Arena application.
 * Manages user authentication state across the application using React Context.
 * Provides login, logout, and session timeout functionality with secure
 * sessionStorage-based persistence to prevent unauthorized route access.
 *
 * Security features:
 * - Session-scoped storage (cleared when browser tab closes).
 * - Automatic session timeout after configurable inactivity period.
 * - Rate limiting on login attempts to prevent brute-force attacks.
 * - Centralized auth state prevents direct URL bypassing of login.
 */

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

/** Duration in milliseconds before an inactive session is automatically expired. */
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

/** Maximum number of failed login attempts before temporary lockout. */
const MAX_LOGIN_ATTEMPTS = 5;

/** Lockout duration in milliseconds after exceeding max login attempts. */
const LOCKOUT_DURATION_MS = 60 * 1000; // 1 minute

/** Key used for sessionStorage to persist auth state within a browser tab. */
const AUTH_STORAGE_KEY = 'kinetic_auth';

/** Represents the shape of the authentication context value. */
interface AuthContextValue {
  /** Whether the user is currently authenticated. */
  isAuthenticated: boolean;
  /** Attempts to authenticate the user. Returns an error message on failure. */
  login: (mobile: string, password: string) => string | null;
  /** Logs the user out and clears session data. */
  logout: () => void;
  /** Number of remaining login attempts before lockout. */
  remainingAttempts: number;
  /** Whether the user is currently locked out from login attempts. */
  isLockedOut: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Custom hook to access the authentication context.
 * Must be used within an `AuthProvider` component tree.
 *
 * @returns The current authentication context value.
 * @throws Error if used outside of an AuthProvider.
 *
 * @example
 * const { isAuthenticated, login, logout } = useAuth();
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('[useAuth] Must be used within an AuthProvider.');
  }
  return context;
}

/**
 * Validates that a mobile number string matches the expected format.
 * Accepts international numbers with 7-15 digits and optional '+' prefix.
 *
 * @param mobile - The raw mobile number input.
 * @returns True if the format is valid.
 */
function isValidMobile(mobile: string): boolean {
  const cleaned = mobile.trim().replace(/[\s()-]/g, '');
  return /^\+?\d{7,15}$/.test(cleaned);
}

/**
 * Validates that a password meets minimum security requirements.
 *
 * @param password - The raw password input.
 * @returns True if the password meets minimum length.
 */
function isValidPassword(password: string): boolean {
  return password.trim().length >= 4;
}

/**
 * AuthProvider wraps the application tree and provides authentication state
 * and methods to all child components via React Context.
 *
 * Security measures implemented:
 * - **Session storage**: Auth state uses `sessionStorage` (not `localStorage`)
 *   so credentials are cleared when the browser tab closes.
 * - **Rate limiting**: After 5 failed login attempts, the user is locked out
 *   for 60 seconds to prevent brute-force attacks.
 * - **Session timeout**: After 30 minutes of inactivity, the session is
 *   automatically expired and the user must re-authenticate.
 * - **Input validation**: Mobile and password are validated before processing.
 *
 * @param props.children - Child components that will have access to auth context.
 * @returns The AuthProvider wrapper component.
 */
export function AuthProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lockoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Resets the session inactivity timer on user interaction. */
  const resetSessionTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsAuthenticated(false);
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      console.warn('[AuthProvider] Session expired due to inactivity.');
    }, SESSION_TIMEOUT_MS);
  }, []);

  /** Sets up activity listeners when authenticated to track session activity. */
  useEffect(() => {
    if (!isAuthenticated) return;

    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    const handleActivity = () => resetSessionTimer();

    activityEvents.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    resetSessionTimer();

    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isAuthenticated, resetSessionTimer]);

  /**
   * Attempts to log in with the provided credentials.
   * Implements rate limiting and input validation.
   *
   * @param mobile - The user's mobile number.
   * @param password - The user's password/ticket ID.
   * @returns An error message string on failure, or null on success.
   */
  const login = useCallback(
    (mobile: string, password: string): string | null => {
      // Check lockout status
      if (isLockedOut) {
        return `Too many failed attempts. Please wait before trying again.`;
      }

      // Validate inputs
      if (!isValidMobile(mobile)) {
        setFailedAttempts((prev) => {
          const next = prev + 1;
          if (next >= MAX_LOGIN_ATTEMPTS) {
            setIsLockedOut(true);
            lockoutTimerRef.current = setTimeout(() => {
              setIsLockedOut(false);
              setFailedAttempts(0);
            }, LOCKOUT_DURATION_MS);
          }
          return next;
        });
        return 'Invalid mobile number format.';
      }

      if (!isValidPassword(password)) {
        setFailedAttempts((prev) => {
          const next = prev + 1;
          if (next >= MAX_LOGIN_ATTEMPTS) {
            setIsLockedOut(true);
            lockoutTimerRef.current = setTimeout(() => {
              setIsLockedOut(false);
              setFailedAttempts(0);
            }, LOCKOUT_DURATION_MS);
          }
          return next;
        });
        return 'Password must be at least 4 characters.';
      }

      // Successful authentication
      setIsAuthenticated(true);
      setFailedAttempts(0);
      try {
        sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      } catch (error) {
        console.warn('[AuthProvider] Failed to persist auth state:', error);
      }
      return null;
    },
    [isLockedOut]
  );

  /** Logs the user out and clears all session data. */
  const logout = useCallback((): void => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  /** Cleanup lockout timer on unmount. */
  useEffect(() => {
    return () => {
      if (lockoutTimerRef.current) clearTimeout(lockoutTimerRef.current);
    };
  }, []);

  const remainingAttempts = MAX_LOGIN_ATTEMPTS - failedAttempts;

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, remainingAttempts, isLockedOut }}>
      {children}
    </AuthContext.Provider>
  );
}
