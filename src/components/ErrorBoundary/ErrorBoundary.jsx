import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 bg-red-900/20 text-white rounded-lg border border-red-500">
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="mb-4 text-red-300">{this.state.error?.message || "An unknown error occurred"}</p>
          <div className="p-4 bg-[#1e293b] rounded-lg border border-[#334155]">
            <p className="text-[#94a3b8]">Editor could not be loaded</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;