import { useLocation } from 'react-router-dom';

function LoginPage() {
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const BACKEND_URL = import.meta.env.VITE_BACKEND_API_BASE_URL || 'http://localhost:5000';

  const googleLoginUrl = `${BACKEND_URL}/auth/google?returnTo=${from}`;

  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h2>Login</h2>
      <p>You must log in to continue.</p>
      <a href={googleLoginUrl}>
        <button style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#4285F4',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Login with Google
        </button>
      </a>
    </div>
  );
}

export default LoginPage;
