# MERN To-Do List Application

A full-stack To-Do List App with user authentication built using the **MERN** stack (MongoDB, Express, React, Node.js).

## Features

- User Registration and Login (with JWT)
- Secure password hashing (bcrypt)
- CRUD operations for To-Do items
- To-Do fields: Title, Description, Status (Pending/Completed), Due Date
- Filter by status
- Search tasks by title
- Edit user profile (name, email, phone)
- Responsive and simple user interface

## Project Structure

Mern-ToDo/
├── client/ # React frontend
├── server/ # Node.js/Express backend with MongoDB
├── README.md # Root readme


##  Setup Instructions

### 1. Clone the Repository

git clone https://github.com/MyasserSharaf1/Mern-ToDo.git
cd Mern-ToDo

### 2. Set Up Server
cd server
npm install

### 3. Create a .env file in the server/ directory:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

### 4. Start the server:
node server.js

### 5. Set Up Client

cd ../client
npm install
npm start

Author
Mohamed Yasser Mohamed Hosny
GitHub: https://github.com/MyasserSharaf1
