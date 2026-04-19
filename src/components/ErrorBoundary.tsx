/**
 * @fileoverview React Error Boundary component for the Kinetic Arena application.
 * Catches unhandled JavaScript errors in the component tree and displays
 * a user-friendly fallback UI instead of a white screen crash.
 *
 * @see https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 */

import React, { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  /** The child components to protect. */
  children: ReactNode;
}

interface ErrorBoundaryState {
  /** Whether an error has been caught. */
  hasError: boolean;
  /** The error message, if any. */
  errorMessage: string;
}

/**
 * A class-based Error Boundary that wraps the application tree.
 * When a rendering error occurs in any child component, this boundary
 * catches it and renders a styled fallback UI with a retry button.
 *
 * @example
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  /**
   * Derives state from an error caught during rendering.
   * @param error - The thrown error object.
   * @returns Updated state to trigger fallback UI.
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message };
  }

  /**
   * Logs error details for debugging purposes.
   * In a production app, this would send to an error reporting service.
   * @param error - The thrown error object.
   * @param errorInfo - React component stack trace information.
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[ErrorBoundary] Uncaught error:', error);
    console.error('[ErrorBoundary] Component stack:', errorInfo.componentStack);
  }

  /** Resets the error state so the user can retry. */
  handleRetry = (): void => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="bg-background text-on-surface min-h-screen flex flex-col items-center justify-center p-8 text-center">
          <span
            className="material-symbols-outlined text-8xl text-tertiary mb-6"
            style={{ fontVariationSettings: "'wght' 700" }}
          >
            error
          </span>
          <h1 className="font-headline font-black text-4xl text-on-surface mb-3">
            Something Went Wrong
          </h1>
          <p className="font-body text-on-surface-variant text-lg max-w-md mb-2">
            An unexpected error occurred. Please try again.
          </p>
          <p className="font-body text-tertiary text-sm mb-8 max-w-md break-all">
            {this.state.errorMessage}
          </p>
          <button
            onClick={this.handleRetry}
            className="bg-primary text-on-primary font-headline font-bold text-lg px-8 py-4 rounded-xl hover:bg-primary-container transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined">refresh</span>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
