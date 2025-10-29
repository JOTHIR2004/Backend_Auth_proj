# 🧑‍💻 User Authentication System (Node.js + Express + PostgreSQL)

This project implements a basic **user authentication system** using **Express.js**, **PostgreSQL**, and **JWT (JSON Web Tokens)**.  
It supports **user registration** and **login** with secure password hashing using **bcrypt**.

---

## 🚀 Features

- User registration with encrypted password
- User login and JWT token generation
- PostgreSQL database integration
- Environment variables for credentials using dotenv
- Organized code structure (MVC pattern)

---

## 🏗️ Project Structure

project-root/
├── config/
│ └── db.js
├── controller/
│ └── userController.js
├── models/
│ └── userModels.js
├── routes/
│ └── authRoutes.js
├── server.js
└── .env


---

## ⚙️ Technologies Used

- **Node.js** – backend runtime
- **Express.js** – web framework
- **PostgreSQL** – database
- **pg** – PostgreSQL client for Node.js
- **bcrypt** – password hashing
- **jsonwebtoken** – JWT authentication
- **dotenv** – environment variables
- **cors** – Cross-Origin Resource Sharing

---

## 🧩 Environment Variables (`.env`)

PORT=5000
DBUSER=your_db_user
DBHOST=localhost
DBBASE=your_database_name
DBPASS=your_db_password
JWT_SECRET=your_jwt_secret


---

## ⚡ Setup Instructions

1. **Install dependencies**
   ```bash
   npm install express cors dotenv pg bcrypt jsonwebtoken
2.Create database table

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);


3.Run the server

npm start


4.Test APIs

POST /api/auth/register

{
  "name": "John",
  "email": "john@example.com",
  "password": "123456"
}


POST /api/auth/login

{
  "email": "john@example.com",
  "password": "123456"
}

🪲 Errors Faced & Fixes
1️⃣ Cannot POST /api/auth/register

Cause:
Missing leading slash in route mounting

app.use("api/auth", authRoutes);


Fix:
Add a leading slash ✅

app.use("/api/auth", authRoutes);

2️⃣ Database Connection Issue

Cause:
Environment variables not loaded properly or incorrect variable names.

Fix:

Used dotenv.config() at the top of server.js

Ensured .env variables matched the keys in db.js:

user: process.env.DBUSER,
host: process.env.DBHOST,
database: process.env.DBBASE,
password: process.env.DBPASS,

3️⃣ Password Not Hashed or Incorrect Hash

Cause:
Using plain text passwords.

Fix:
Added bcrypt hashing in registerUser:

const hashedPassword = await bcrypt.hash(password, 10);

4️⃣ Invalid Login (even with correct password)

Cause:
Password comparison failed because stored password was not hashed properly.

Fix:
Used bcrypt comparison in loginUser:

const isMatch = await bcrypt.compare(password, user.password);

5️⃣ Missing Route Connection

Cause:
Route file (authRoutes.js) was defined but not connected to the Express app.

Fix:
Added in server.js:

import authRoutes from './routes/authRoutes.js';
app.use('/api/auth', authRoutes);

✅ Final Working Flow

Frontend / Postman sends:

POST /api/auth/register


Route → authRoutes.js → /register

Controller → userController.js → handles registration

Model → userModels.js → executes PostgreSQL query

Database → stores user in users table

🧠 Learning Outcomes

Understood Express routing and middleware

Learned how to manage environment variables using dotenv

Connected Node.js with PostgreSQL using pg

Implemented secure password hashing

Used JWT for token-based authentication

Debugged common Express route and connection issues
