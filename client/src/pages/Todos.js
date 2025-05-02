import React, { useState, useEffect } from 'react';
import api from '../api/axoisconfig';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', dueDate: '', status: 'pending' }); // Default status is 'pending'
  const [filter, setFilter] = useState({ status: '', search: '' });

  const fetchTodos = async () => {
    const query = new URLSearchParams(filter).toString();
    const res = await api.get(`/todos?${query}`);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, [filter]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.status) {
      form.status = 'pending';  // Default to 'pending' if no status is selected
    }

    await api.post('/todos', form);
    setForm({ title: '', description: '', dueDate: '', status: 'pending' }); // Reset form after adding
    fetchTodos();
  };

  const handleUpdate = async (id, update) => {
    await api.put(`/todos/${id}`, update);
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await api.delete(`/todos/${id}`);
    fetchTodos();
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">My To-Dos</h2>

      {/* Filter & Search */}
      <div className="mb-3">
        <select
          value={filter.status}
          onChange={(e) => setFilter((f) => ({ ...f, status: e.target.value }))}
          className="form-select d-inline-block w-auto me-2"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="text"
          placeholder="Search title…"
          value={filter.search}
          onChange={(e) => setFilter((f) => ({ ...f, search: e.target.value }))}
          className="form-control d-inline-block w-auto"
        />
      </div>

      {/* Add Form */}
      <form onSubmit={handleAdd} className="mb-4">
        <div className="mb-3">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <select
            name="status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="form-select"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Add</button>
      </form>

      {/* To-Do List */}
      <ul className="list-group">
        {todos.map((t) => (
          <li key={t._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{t.title}</strong> ({t.status}) — due {new Date(t.dueDate).toLocaleDateString()}
            </div>
            <div>
              <button
                onClick={() => handleUpdate(t._id, { status: t.status === 'pending' ? 'completed' : 'pending' })}
                className={`btn btn-sm ${t.status === 'pending' ? 'btn-warning' : 'btn-success'} me-2`}
              >
                Toggle Status
              </button>
              <button
                onClick={() => handleDelete(t._id)}
                className="btn btn-sm btn-danger"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
