import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("VictorCo Runtime Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', background: '#0B0F19', color: '#F9FAFB',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif'
        }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.2)',
            color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '1rem'
          }}>
            ⚡
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>VictorCo Recovery Mode</h1>
          <p style={{ color: '#9CA3AF', maxWidth: '480px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            The application encountered a browser cache glitch. Click below to reset state and load fresh VictorCo Google AdSense platform.
          </p>
          <button 
            onClick={this.handleReset}
            style={{
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', color: 'white', border: 'none',
              padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer'
            }}
          >
            Reset App & Reload Fresh State
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
