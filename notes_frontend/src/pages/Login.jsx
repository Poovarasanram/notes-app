import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Spin, message } from 'antd';
import 'antd/dist/reset.css'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username,
        password,
      });

      const { access, refresh } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      messageApi.open({
        type: 'success',
        content: 'Login successful! Redirecting...',
      });

      setTimeout(() => navigate('/notes'), 1500);
    } catch (error) {
      console.error('Login error:', error);
      messageApi.open({
        type: 'error',
        content: 'Invalid username or password.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      {contextHolder}
      <h2>Sign in to your account</h2>
      <form onSubmit={handleLogin}>
        <label>User Name</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="form-actions">
          {loading ? <Spin /> : <button type="submit">Sign in</button>}
        </div>
      </form>

      <p className="form-footer">
        Don’t have an account? <Link to="/register">Sign up</Link>
      </p>

      <style>{`
        .form-container {
          max-width: 350px;
          margin: 4rem auto;
          padding: 2rem;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 0 8px rgba(0,0,0,0.1);
          font-family: sans-serif;
        }

        h2 {
          text-align: center;
          color: #333;
        }

        label {
          display: block;
          margin-top: 1rem;
          font-weight: 500;
          color: #555;
        }

        input {
          width: 100%;
          padding: 0.6rem;
          margin-top: 0.3rem;
          border: 1px solid #d3d3d3;
          border-radius: 6px;
          font-size: 0.95rem;
          outline: none;
        }

        .form-actions {
          display: flex;
          justify-content: center;
          margin-top: 1.2rem;
        }

        button {
          width: 100%;
          padding: 0.7rem;
          background: #5A4FCF;
          border: none;
          color: white;
          border-radius: 6px;
          font-size: 1rem;
          cursor: pointer;
        }

        .form-footer {
          text-align: center;
          margin-top: 1rem;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}

export default Login;
