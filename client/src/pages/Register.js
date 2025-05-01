import React, { useState } from 'react';
import api from '../api/axoisconfig';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {['name','email','password','phone'].map(f => (
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
      <button type="submit">Register</button>
    </form>
  );
}
