import './Profile.css';

const Profile = ({ user, onAuthChange }) => {
  const handleLogout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/api/auth/logout/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        onAuthChange(null);
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if API call fails
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      onAuthChange(null);
    }
  };

  if (!user) {
    return (
      <div className="profile">
        <div className="profile-container">
          <div className="no-user">
            <h2>🔐 Access Denied</h2>
            <p>Please log in to view your profile.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <span className="avatar-icon">👤</span>
          </div>
          <div className="profile-info">
            <h1>Welcome, {user.username}!</h1>
            <p className="profile-email">{user.email || 'No email provided'}</p>
            <div className="profile-stats">
              <span className="stat-badge">
                <span className="stat-icon">📅</span>
                Member since {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h3>🎯 Account Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Username</label>
                <span>{user.username}</span>
              </div>
              <div className="info-item">
                <label>Email</label>
                <span>{user.email || 'Not provided'}</span>
              </div>
              <div className="info-item">
                <label>Account Type</label>
                <span>Standard User</span>
              </div>
              <div className="info-item">
                <label>Status</label>
                <span className="status-active">Active</span>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h3>⚡ Usage Statistics</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">😂</div>
                <div className="stat-content">
                  <div className="stat-number">0</div>
                  <div className="stat-label">Jokes Generated</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🔐</div>
                <div className="stat-content">
                  <div className="stat-number">0</div>
                  <div className="stat-label">Messages Encrypted</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📱</div>
                <div className="stat-content">
                  <div className="stat-number">0</div>
                  <div className="stat-label">QR Codes Created</div>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h3>🔧 Account Actions</h3>
            <div className="actions-grid">
              <button className="action-button secondary">
                <span>✏️</span>
                Edit Profile
              </button>
              <button className="action-button secondary">
                <span>🔑</span>
                Change Password
              </button>
              <button className="action-button secondary">
                <span>📊</span>
                Export Data
              </button>
              <button className="action-button danger" onClick={handleLogout}>
                <span>🚪</span>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;