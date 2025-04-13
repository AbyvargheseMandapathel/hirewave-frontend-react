import React from 'react';

class JobFormErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Job form error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="max-w-4xl mx-auto p-6 md:p-10">
          <div className="bg-[#1e293b] rounded-xl p-8 shadow-2xl text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Something went wrong</h2>
            <p className="text-[#94a3b8] mb-6">
              There was an error with the job form. Please try again or contact support.
            </p>
            <details className="text-left mb-6 text-[#94a3b8]">
              <summary className="cursor-pointer mb-2">Error details</summary>
              <p className="text-red-400">{this.state.error && this.state.error.toString()}</p>
              <pre className="mt-2 p-4 bg-[#0f172a] rounded overflow-auto text-xs">
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-[#818cf8] to-[#a5b4fc] text-white px-8 py-3 rounded-lg hover:from-[#a5b4fc] hover:to-[#818cf8] transition-all duration-300"
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

export default JobFormErrorBoundary;