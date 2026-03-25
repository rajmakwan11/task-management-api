# 📝 Task Management API

A robust and secure RESTful API built using **Node.js, Express.js, and MongoDB**, implementing user authentication and task management with proper security and clean architecture.

---

## 🚀 Features

* 🔐 User Authentication (Register, Login, Logout)
* 🔑 JWT-based Authorization
* 📌 Task Management (CRUD Operations)
* 👤 User-specific task ownership (Security enforced)
* 📄 Pagination for task listing
* 🧱 MVC Architecture
* ⚙️ Environment-based configuration

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB with Mongoose
* **Authentication:** JWT (JSON Web Token)
* **Security:** bcrypt for password hashing

---

## 📁 Project Structure

```
project-root/
│
├── controllers/
├── models/
├── routes/
├── middlewares/
├── config/
├── .env
├── app.js / server.js
└── package.json
```

---

## 🔐 Authentication APIs

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | /api/auth/register | Register new user |
| POST   | /api/auth/login    | Login user        |
| POST   | /api/auth/logout   | Logout user       |

---

## 📌 Task APIs (Protected)

| Method | Endpoint       | Description                     |
| ------ | -------------- | ------------------------------- |
| POST   | /api/tasks     | Create a new task               |
| GET    | /api/tasks     | Get all tasks (with pagination) |
| GET    | /api/tasks/:id | Get single task                 |
| PUT    | /api/tasks/:id | Update task                     |
| DELETE | /api/tasks/:id | Delete task                     |

---

## 📦 Request & Response Format

### ✅ Success Response

```json
{
  "status": "success",
  "data": {},
  "message": "Optional message"
}
```

### ❌ Error Response

```json
{
  "status": "fail",
  "data": {},
  "message": "Error message"
}
```

---

## 🔐 Security Features

* Passwords are hashed using bcrypt
* JWT authentication for protected routes
* Users can only access their own tasks
* Middleware used for route protection

---

## ⚙️ Environment Variables

Create a `.env` file and add:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## ▶️ How to Run

```bash
# Install dependencies
npm install

# Run server
npm run dev
```

---

## 🧪 API Testing

Use tools like:

* Postman
* Thunder Client

---

## 💡 Learning Outcomes

* Implemented secure authentication system
* Understood JWT and middleware usage
* Built REST APIs with proper structure
* Applied ownership-based access control

---

## 📌 Author

* **Your Name**

---

## ⭐ Future Improvements

* Add input validation using Joi/Zod
* Add task filtering (status-wise)
* Add refresh tokens
* Add rate limiting

---

⭐ If you found this useful, feel free to star the repository!
