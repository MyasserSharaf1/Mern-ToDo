
### 2. Server `README.md` (Place in `Mern-ToDo/server/README.md`)**

# Server - MERN To-Do App (Backend)

This folder contains the Express.js server code for the MERN To-Do List application.

## Technologies

- Express.js
- MongoDB + Mongoose
- bcrypt for password hashing
- JSON Web Token (JWT) for authentication
- CORS and dotenv

## Folder Structure

server/
├── controllers/ # Route handlers
├── middleware/ # Auth middleware
├── models/ # Mongoose schemas
├── routes/ # API routes (auth & todos)
├── .env # Environment variables
├── server.js # Entry point

By default, the backend will run at http://localhost:5000.

## API Endpoints
Auth Routes
Method |	Endpoint	| Description
POST   | /auth/register	| Register a new user
POST   |  /auth/login	| Log in and receive JWT

User Routes
Method |	Endpoint |	Description
PUT	   | /users/:id	 | Update user personal details

ToDo Routes
Method |	Endpoint |	Description
GET	   |    /todos   | 	Get user's todos
POST   |   	/todos	 |  Create new todo
PUT	   |  /todos/:id |  Update a todo
DELETE | /todos/:id	 |   Delete a todo
