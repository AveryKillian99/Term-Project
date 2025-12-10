import { useLocation } from 'react-router-dom';
import './LoginPage.css'; // Create this file

function LoginPage() {
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  // Uses Render in production, localhost in dev
  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_API_BASE_URL ||
    'http://localhost:5000';

  const googleLoginUrl = `${BACKEND_URL}/auth/google?returnTo=${from}`;

  return (
    <div className="login-container">
      <h2>Login</h2>
      <p>You must log in to continue.</p>

      <a href={googleLoginUrl}>
        <button className="login-btn">Login with Google</button>
      </a>
    </div>
  );
}

export default LoginPage;
