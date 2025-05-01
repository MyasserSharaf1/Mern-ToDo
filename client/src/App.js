import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import PrivateRoute from './Components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Todos from './pages/Todos';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={<PrivateRoute><Dashboard /></PrivateRoute>}
          />
          <Route
            path="/todos"
            element={<PrivateRoute><Todos /></PrivateRoute>}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
