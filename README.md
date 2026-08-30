# cohort-9-mern-8553-muhammad
Cohort 9 — MERN (NodeJS+ReactJS) assignment for Muhammad Zayan Ehsan
# MERN Notes Management System

A full-stack Notes Management System built using the MERN stack. The application allows users to create an account, log in securely, and manage their personal notes.

---

## About the Project

The Notes App is a web application where users can register and log in to their accounts. After authentication, users can create, view, edit, and delete their own notes.

The application is divided into two main parts:

- **Frontend** - React application that provides the user interface.
- **Backend** - Node.js and Express API that handles authentication, notes, and database operations.

MongoDB is used to store users and notes.

---

## How the Application Works

The application follows this general flow:

```text
User
  ↓
React Frontend
  ↓
Express Backend API
  ↓
MongoDB Database
```

When a user performs an action in the frontend, such as logging in or creating a note, the frontend sends a request to the backend.

The backend processes the request, performs the required authentication or database operation, and sends a response back to the frontend.

---

## User Authentication

A user can create an account using the registration page.

During registration:

1. The user enters their information.
2. The frontend sends the registration request to the backend.
3. The backend validates the information.
4. The password is securely hashed using `bcrypt`.
5. The user is stored in MongoDB.

For login:

1. The user enters their email and password.
2. The frontend sends the login request to the backend.
3. The backend verifies the credentials.
4. A JWT is generated after successful authentication.
5. Authentication information is stored using cookies.
6. The user can then access protected features of the application.

Protected routes require authentication before they can be accessed.

---

## Notes Management

After logging in, users can manage their notes.

The application supports complete CRUD operations:

- **Create** a new note.
- **Read** and view existing notes.
- **Update** an existing note.
- **Delete** a note.

Users can only access their own notes through the authenticated backend requests.

The note editor also supports rich-text content using Tiptap, and content is sanitized using DOMPurify.

---


## Validation and Error Handling

The backend includes validation and error-handling middleware.

Note requests are validated before being processed. MongoDB ObjectIds are also validated before database operations.

The application uses centralized error handling so that errors are returned to the frontend in a consistent way.

---

## Security

The application includes several security measures:

- Passwords are hashed using `bcrypt`.
- JWT is used for authentication.
- Authentication uses cookies.
- Protected routes require authentication.
- Note ownership is associated with authenticated users.
- Note content is sanitized on the frontend using DOMPurify.
- CORS is configured between the frontend and backend.
- Sensitive environment variables are kept outside the source code.

---

## Testing

The project includes automated tests for both the backend and frontend.

### Backend

Backend tests use:

- Jest
- Supertest

Run backend tests:

```bash
cd backend
npm test
```

### Frontend

Frontend tests use:

- Vitest
- React Testing Library

Run frontend tests:

```bash
cd frontend
npm test
```

---

## Code Quality

The project uses **SonarQube** to analyze code quality and identify potential issues.

**CodeRabbit** is also used for automated code review.

ESLint is used to check frontend code quality.

Run the frontend linter:

```bash
cd frontend
npm run lint
```

---


## How to Run the Project

### Backend

Install dependencies:

```bash
cd backend
npm install
```

Start the backend:

```bash
npm start
```

The backend normally runs on:

```text
http://localhost:5000
```

### Frontend

Open another terminal and install dependencies:

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend normally runs on:

```text
http://localhost:5173
```

---

## Deployment

The application is deployed using:

- **Frontend:** Vercel
- **Backend:** Railway
- **Database:** MongoDB

The required production environment variables are configured on the deployment platforms.

---

## Git Workflow

The project follows a feature-branch workflow:

```text
Feature Branch
      ↓
Pull Request
      ↓
develop
      ↓
main
```

Different features and improvements were developed using separate branches and merged through Pull Requests.

---

## Project Status

The application has been tested locally and in the deployed environment.

The following functionality has been verified:

- User registration
- User login
- Authentication
- Profile access
- Note creation
- Note viewing
- Note editing
- Note deletion
- Note search
- User logout
- Frontend tests
- Backend tests
- Production deployment