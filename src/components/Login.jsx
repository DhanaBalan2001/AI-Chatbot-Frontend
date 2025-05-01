import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import AuthStore from '../stores/AuthStore.js';

const Login = observer(() => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await AuthStore.login(username, password);
      navigate('/chat');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
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
          <button 
            type="submit" 
            className="login-button"
            disabled={AuthStore.isLoading}
          >
            {AuthStore.isLoading ? 'Logging in...' : 'Login'}
          </button>
          <button 
            type="button" 
            className="register-button"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
});

export default Login;