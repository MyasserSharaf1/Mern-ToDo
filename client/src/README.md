
---

### **3. Client `README.md` (Place in `Mern-ToDo/client/README.md`)**

```markdown
# Client - MERN To-Do App (Frontend)

This folder contains the React frontend for the To-Do List App with authentication.

## Technologies

- React.js
- React Router DOM
- Bootstrap (for styling)
- Axios (for API calls)
- Context API (for authentication state)

## Features

- Registration and Login pages
- To-Do list interface with:
  - Add, Edit, Delete todos
  - Search by title
  - Filter by completion status
- User profile page to update name, email, and phone
- Form validation and error handling
- Responsive layout

## Setup

npm install
npm start

Runs on http://localhost:3000.

## API Base URL

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});
