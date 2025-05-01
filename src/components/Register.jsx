import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import AuthStore from '../stores/AuthStore.js';

const Register = observer(() => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await AuthStore.register(username, password, isAdmin);
      navigate('/chat');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };
  
  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
        {AuthStore.error && <div className="error-message">{AuthStore.error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="isAdmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            <label htmlFor="isAdmin">Register as Admin</label>
          </div>
          <button 
            type="submit" 
            className="register-button"
            disabled={AuthStore.isLoading}
          >
            {AuthStore.isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="login-link">
          Already have an account? <span onClick={() => navigate('/login')}>Login</span>
        </div>
      </div>
    </div>
  );
});

export default Register;
