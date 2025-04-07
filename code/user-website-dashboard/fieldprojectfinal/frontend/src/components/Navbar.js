import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles.css'; // Make sure this path is correct

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCommunityClick = (e) => {
    const isLoggedIn = localStorage.getItem('token');
    if (!isLoggedIn) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setShowLoginModal(false);
      navigate('/community');
    } catch (err) {
      setError(err.response?.data?.errors?.[0]?.msg || 'Login failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">FireSafety</Link>
        </div>
        
        <div className="navbar-menu">
          <Link to="/incidents">Incidents</Link>
          <Link to="/safety">Safety</Link>
          <Link to="/drills">Drills</Link>
          <Link to="/community" onClick={handleCommunityClick}>Community</Link>
          
          {localStorage.getItem('token') ? (
            <button onClick={handleLogout} className="logout-button">Logout</button>
          ) : null}
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="login-modal-overlay">
          <div className="login-modal">
            <div className="login-modal-header">
              <h3>Login Required</h3>
              <button 
                onClick={() => setShowLoginModal(false)}
                className="close-button"
              >
                &times;
              </button>
            </div>
            
            <div className="login-modal-body">
              {error && <div className="login-error">{error}</div>}
              
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="login-button">Login</button>
                  <button 
                    type="button" 
                    className="cancel-button"
                    onClick={() => setShowLoginModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;