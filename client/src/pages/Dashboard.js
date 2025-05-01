import React, { useContext } from 'react';
import { AuthContext } from '../Context/Authcontext';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Your email: {user.email}</p>
    </div>
  );
}
