import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardComponent from './components/DashBoardComponent';
import LoginPage from './components/auth/LoginComponent.jsx';
import ProfilePage from './components/auth/ProfilePage.jsx';
import ProtectedLayout from './components/auth/ProtectedLayout.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<DashboardComponent />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
