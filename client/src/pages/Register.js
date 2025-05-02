import React, { useState } from 'react';
import api from '../api/axoisconfig';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      alert('Registration successful! You can now log in.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          {['name', 'email', 'password', 'phonenumber'].map((f, i) => (
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
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
}
