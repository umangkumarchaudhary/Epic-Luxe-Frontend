'use client';

import React from 'react';
import ContactUs from './page';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ContactErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Contact Page Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Component Stack:', errorInfo.componentStack);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center p-4">
          <div className="max-w-md bg-[#1a1a1a] border border-red-500/20 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-400 mb-4">Contact Page Error</h2>
            <p className="text-white/70 mb-4">
              The contact page encountered an error. This helps us identify the exact issue.
            </p>
            <div className="bg-black/50 p-3 rounded text-xs font-mono text-red-300 mb-4 overflow-auto max-h-32">
              <div>Error: {this.state.error?.message}</div>
              <div className="mt-2">Stack: {this.state.error?.stack}</div>
            </div>
            <button
              onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
              className="bg-[#D4AF37] text-black px-4 py-2 rounded font-semibold hover:bg-[#BFA980] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function ContactWrapper() {
  return (
    <ContactErrorBoundary>
      <ContactUs />
    </ContactErrorBoundary>
  );
}