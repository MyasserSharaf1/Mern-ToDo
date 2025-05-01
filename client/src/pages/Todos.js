import React, { useState, useEffect } from 'react';
import api from '../api/axoisconfig';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({});
  const [filter, setFilter] = useState({ status: '', search: '' });

  const fetchTodos = async () => {
    const query = new URLSearchParams(filter).toString();
    const res = await api.get(`/todos?${query}`);
    setTodos(res.data);
  };

  useEffect(() => { fetchTodos(); }, [filter]);

  const handleAdd = async e => {
    e.preventDefault();
    await api.post('/todos', form);
    setForm({});
    fetchTodos();
  };

  const handleUpdate = async (id, update) => {
    await api.put(`/todos/${id}`, update);
    fetchTodos();
  };

  const handleDelete = async id => {
    await api.delete(`/todos/${id}`);
    fetchTodos();
  };

  return (
    <div>
      <h2>My To-Dos</h2>

      {/* Filter & Search */}
      <div>
        <select
          value={filter.status}
          onChange={e => setFilter(f => ({ ...f, status: e.target.value }))}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="text"
          placeholder="Search title…"
          value={filter.search}
          onChange={e => setFilter(f => ({ ...f, search: e.target.value }))}
        />
      </div>

      {/* Add Form */}
      <form onSubmit={handleAdd}>
        <input
          name="title"
          placeholder="Title"
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          name="description"
          placeholder="Description"
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="date"
          name="dueDate"
          onChange={e => setForm({ ...form, dueDate: e.target.value })}
        />
        <button type="submit">Add</button>
      </form>

      {/* List */}
      <ul>
        {todos.map(t => (
          <li key={t._id}>
            <strong>{t.title}</strong> ({t.status}) — due {new Date(t.dueDate).toLocaleDateString()}
            <button onClick={() => handleUpdate(t._id, { status: t.status==='pending'? 'completed':'pending' })}>
              Toggle
            </button>
            <button onClick={() => handleDelete(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
