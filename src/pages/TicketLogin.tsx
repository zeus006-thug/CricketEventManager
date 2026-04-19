/**
 * @fileoverview TicketLogin page component for the Kinetic Arena application.
 * Provides a secure authentication form with real-time input validation,
 * visual error feedback, rate limiting, lockout protection, and accessible
 * form controls. Integrates with AuthContext for centralized session management.
 *
 * Security features:
 * - XSS prevention via input sanitization.
 * - Rate limiting: 5 failed attempts triggers a 60-second lockout.
 * - Visual feedback for remaining attempts and lockout state.
 * - Passwords are never logged or stored in plaintext.
 * - Session is stored in sessionStorage (tab-scoped, not persistent).
 */

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { LoginFormErrors } from '../types';

/** Minimum character length required for the password/ticket ID field. */
const MIN_PASSWORD_LENGTH = 4;

/**
 * Sanitizes a raw input string by trimming whitespace and removing
 * potentially dangerous characters to prevent XSS injection.
 *
 * @param input - The raw user input string.
 * @returns A sanitized version of the input safe for processing.
 */
function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>'"&]/g, '');
}

/**
 * Validates the mobile number field against format rules.
 *
 * @param value - The current mobile number input value.
 * @returns An error message string, or empty string if valid.
 */
function validateMobile(value: string): string {
  const sanitized = sanitizeInput(value);
  if (!sanitized) return 'Mobile number is required.';
  if (!/^\+?\d{7,15}$/.test(sanitized.replace(/[\s()-]/g, ''))) {
    return 'Enter a valid phone number (7–15 digits).';
  }
  return '';
}

/**
 * Validates the password/ticket ID field against security requirements.
 *
 * @param value - The current password input value.
 * @returns An error message string, or empty string if valid.
 */
function validatePassword(value: string): string {
  const sanitized = sanitizeInput(value);
  if (!sanitized) return 'Ticket ID / Password is required.';
  if (sanitized.length < MIN_PASSWORD_LENGTH) {
    return `Must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }
  return '';
}

/**
 * TicketLogin renders the secure authentication entry point for Kinetic Arena.
 * It validates user input, delegates authentication to the AuthContext,
 * and displays visual error feedback including rate-limiting warnings.
 *
 * @returns The rendered TicketLogin page component.
 */
export default function TicketLogin(): React.JSX.Element {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginFormErrors>({ mobile: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login, remainingAttempts, isLockedOut } = useAuth();

  /**
   * Handles form submission. First validates locally, then delegates
   * to AuthContext.login() which enforces rate limiting and session creation.
   */
  const handleLogin = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isLockedOut) return;

      setIsSubmitting(true);

      // Client-side validation
      const mobileError = validateMobile(mobile);
      const passwordError = validatePassword(password);

      if (mobileError || passwordError) {
        setErrors({ mobile: mobileError, password: passwordError });
        setIsSubmitting(false);
        return;
      }

      setErrors({ mobile: '', password: '' });

      // Delegate to AuthContext for authentication + rate limiting
      const authError = login(sanitizeInput(mobile), sanitizeInput(password));

      if (authError) {
        setErrors({ mobile: '', password: authError });
        setIsSubmitting(false);
        return;
      }

      // Simulate auth processing delay
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/dashboard');
      }, 400);
    },
    [mobile, password, navigate, login, isLockedOut]
  );

  return (
    <div className="bg-background text-on-surface min-h-screen relative w-full overflow-hidden flex items-center justify-center">
      {/* Decorative background blurs */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-tertiary/10 blur-[100px] rounded-full pointer-events-none" />
      </div>

      <main className="w-full max-w-md px-6 py-12 z-10 flex flex-col items-center">
        {/* Brand header */}
        <div className="flex flex-col items-center mb-12 text-center w-full relative">
          <h1 className="font-headline font-black text-4xl sm:text-5xl italic text-primary drop-shadow-[0_0_12px_rgba(165,255,184,0.3)] tracking-tight">
            KINETIC ARENA
          </h1>
          <p className="font-body text-on-surface-variant text-sm mt-2 font-medium tracking-wide">
            ENTER THE MADNESS
          </p>
        </div>

        {/* Login card */}
        <div className="w-full bg-surface-container-low/80 backdrop-blur-2xl rounded-xl p-8 flex flex-col gap-8 relative">
          <div className="absolute inset-0 rounded-xl border border-outline-variant/15 pointer-events-none" aria-hidden="true" />

          <div className="flex flex-col gap-2">
            <h2 className="font-headline text-2xl font-bold text-on-surface">Ticket Access</h2>
            <p className="font-body text-sm text-on-surface-variant">
              Enter your details to load your matchday pass.
            </p>
          </div>

          {/* Lockout Warning */}
          {isLockedOut && (
            <div className="bg-tertiary/10 border border-tertiary/30 rounded-lg p-4 flex items-center gap-3" role="alert">
              <span className="material-symbols-outlined text-tertiary text-2xl">lock</span>
              <div>
                <p className="text-tertiary font-bold text-sm">Account Temporarily Locked</p>
                <p className="text-on-surface-variant text-xs">Too many failed attempts. Please wait 60 seconds.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full" noValidate>
            {/* Mobile Number Field */}
            <div className="flex flex-col gap-2 relative group">
              <label className="font-label text-sm font-medium text-secondary" htmlFor="mobile">
                Mobile Number
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-on-surface-variant group-focus-within:text-primary transition-colors" aria-hidden="true">
                  smartphone
                </span>
                <input
                  className={`w-full bg-surface-container-lowest text-on-surface font-body text-base px-12 py-4 rounded-lg border-b-2 outline-none transition-all placeholder:text-on-surface-variant/50 ${
                    errors.mobile ? 'border-b-tertiary' : 'border-transparent focus:border-b-primary'
                  }`}
                  id="mobile"
                  name="mobile"
                  placeholder="+1 (555) 000-0000"
                  type="tel"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.mobile}
                  aria-describedby={errors.mobile ? 'mobile-error' : undefined}
                  autoComplete="tel"
                  disabled={isLockedOut}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              {errors.mobile && (
                <p id="mobile-error" className="text-tertiary text-xs font-medium mt-1 flex items-center gap-1" role="alert">
                  <span className="material-symbols-outlined text-[14px]">error</span>
                  {errors.mobile}
                </p>
              )}
            </div>

            {/* Password / Ticket ID Field */}
            <div className="flex flex-col gap-2 relative group">
              <label className="font-label text-sm font-medium text-secondary" htmlFor="password">
                Ticket ID / Password
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-on-surface-variant group-focus-within:text-primary transition-colors" aria-hidden="true">
                  lock
                </span>
                <input
                  className={`w-full bg-surface-container-lowest text-on-surface font-body text-base px-12 py-4 rounded-lg border-b-2 outline-none transition-all placeholder:text-on-surface-variant/50 ${
                    errors.password ? 'border-b-tertiary' : 'border-transparent focus:border-b-primary'
                  }`}
                  id="password"
                  name="password"
                  placeholder="Enter Reference / Password"
                  type="password"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  autoComplete="current-password"
                  minLength={MIN_PASSWORD_LENGTH}
                  disabled={isLockedOut}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errors.password && (
                <p id="password-error" className="text-tertiary text-xs font-medium mt-1 flex items-center gap-1" role="alert">
                  <span className="material-symbols-outlined text-[14px]">error</span>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remaining attempts warning */}
            {remainingAttempts < 5 && remainingAttempts > 0 && !isLockedOut && (
              <p className="text-tertiary/80 text-xs font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">warning</span>
                {remainingAttempts} attempt{remainingAttempts !== 1 ? 's' : ''} remaining before lockout
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isLockedOut}
              className="w-full mt-4 bg-primary text-on-primary font-headline font-bold text-lg py-4 rounded-xl shadow-[0_0_24px_rgba(165,255,184,0.15)] hover:shadow-[0_0_32px_rgba(165,255,184,0.25)] hover:bg-primary-container transition-all flex items-center justify-center gap-2 no-underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  <span>Verifying...</span>
                </>
              ) : isLockedOut ? (
                <>
                  <span className="material-symbols-outlined">lock</span>
                  <span>LOCKED</span>
                </>
              ) : (
                <>
                  <span>ENTER ARENA</span>
                  <span className="material-symbols-outlined font-bold" style={{ fontVariationSettings: "'wght' 700" }}>
                    arrow_forward
                  </span>
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <a
              href="#help"
              className="font-body text-sm text-secondary hover:text-primary transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                alert('Please check your email or SMS for the ticket reference sent by Kinetic Arena.');
              }}
            >
              Need help finding your ticket?
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
