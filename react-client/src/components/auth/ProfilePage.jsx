import { useAuth } from './AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) return null; // Safety

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Profile Page</h2>
      <h3>Welcome, {user.displayname}!</h3>
      <p><strong>Email:</strong> {user.email}</p>
      {user.googleid && <p><strong>User ID:</strong> {user.googleid}</p>}
      <button onClick={handleLogout} style={{
        padding: '0.5rem 1rem',
        backgroundColor: '#d9534f',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '1rem'
      }}>Logout</button>
      <details style={{ marginTop: '2rem', opacity: '0.7' }}>
        <summary>Raw User Data</summary>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </details>
    </div>
  );
}

export default ProfilePage;
