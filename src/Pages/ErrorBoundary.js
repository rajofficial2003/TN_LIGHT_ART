import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
  <div className="">
          <div style={{
          padding: '20px',
          backgroundColor: '#ff6b6b',
          color: 'white',
          borderRadius: '5px',
          textAlign: 'center',
          margin: '20px 0'
        }}>
          <h2>Oops! Something went wrong.</h2>
          <p>We're sorry for the inconvenience. Please try refreshing the page or contact support if the problem persists.</p>
        </div>
  </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

