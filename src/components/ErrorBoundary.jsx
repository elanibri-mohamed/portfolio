import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import './ErrorBoundary.css';

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * and displays a fallback UI instead of crashing the whole app
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details in production
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" role="alert" aria-live="assertive">
          <div className="error-boundary__content">
            <FaExclamationTriangle className="error-boundary__icon" aria-hidden="true" />
            <h2 className="error-boundary__title">Something went wrong</h2>
            <p className="error-boundary__message">
              We apologize for the inconvenience. Please try refreshing the page or going back home.
            </p>
            <div className="error-boundary__actions">
              <button 
                className="error-boundary__btn error-boundary__btn--primary"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </button>
              <button 
                className="error-boundary__btn error-boundary__btn--secondary"
                onClick={this.handleReset}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
