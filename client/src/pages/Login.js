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
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {['email','password'].map(f => (
        <div key={f}>
          <input
            type={f==='password' ? 'password' : 'text'}
            name={f}
            placeholder={f}
            onChange={e => setForm({ ...form, [f]: e.target.value })}
            required
          />
        </div>
      ))}
      <button type="submit">Login</button>
    </form>
  );
}
