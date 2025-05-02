import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/Authcontext';
import api from '../api/axoisconfig';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phonenumber: user.phonenumber || '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        name: formData.name,
        email: formData.email,
        phonenumber: formData.phonenumber,
      };

      const response = await api.put(`/users/${user._id}`, updatedUser);
      alert('Profile updated successfully!');
      console.log(response.data);
    } catch (err) {
      console.error('Error updating user data:', err.message);
      alert(err.response?.data?.error || 'Update failed');
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1>Welcome, {user.name}!</h1>
        <p className="text-muted">Your email: {user.email}</p>
        <p className="text-muted">Your phone: {user.phonenumber}</p>
      </div>

      <div className="card shadow p-4 mx-auto" style={{ maxWidth: '500px' }}>
        <h4 className="mb-3 text-center">Update Profile</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="form-control"
              required
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary w-100">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
