import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/Authcontext';

export default function Layout({ children }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
        <Link to="/">Dashboard</Link>{' '}
        {user ? (
          <>
            <Link to="/todos">My To-Dos</Link>{' '}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>{' '}
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      <main style={{ padding: '1rem' }}>{children}</main>
    </div>
  );
}
