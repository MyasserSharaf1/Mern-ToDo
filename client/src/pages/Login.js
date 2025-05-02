import React, { useState, useContext } from 'react';
import api from '../api/axoisconfig';
import { AuthContext } from '../Context/Authcontext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      login(res.data);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          {['email', 'password'].map(f => (
            <div className="mb-3" key={f}>
              <label className="form-label text-capitalize">{f}</label>
              <input
                type={f === 'password' ? 'password' : 'text'}
                name={f}
                className="form-control"
                placeholder={`Enter ${f}`}
                onChange={e => setForm({ ...form, [f]: e.target.value })}
                required
              />
            </div>
          ))}
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}
