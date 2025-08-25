import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from './common/Button';
import './Dashboard.css';
import { User } from '../services/users/types';
import { userService } from '../services/users/users.service';

const Dashboard: React.FC = () => {
  const { logout } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProfile = async () => {
      try {
        const data = await userService.getProfile();
        setUser(data);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError('Failed to load user profile. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <p>{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dashboard-no-user">
        <p>No user data found.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <img src="/easyGenerator.svg" alt="EasyGenerator Logo" />
        <h1>Welcome to your dashboard</h1>
        <Button onClick={handleLogout} variant="danger" size="medium">
          Logout
        </Button>
      </header>

      <main className="dashboard-content">
        <section className="welcome-card">
          <h2>Hello, {user.name}!</h2>
          <p>You have successfully signed in to your account.</p>
          <div className="user-info">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user.userId}</p>
          </div>
        </section>

        <section className="features-section">
          <h3>What you can do:</h3>
          <ul className="features-list">
            <li>Access protected routes</li>
            <li>View your profile information</li>
            <li>Securely log out</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
