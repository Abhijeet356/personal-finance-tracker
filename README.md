# Personal Finance Tracker

A full-stack personal finance tracker app built by a two-person team.

- Frontend: Next.js
- Backend: Node.js, Express.js, MongoDB, Mongoose

## Project Structure

```text
personal-finance-tracker/
  frontend/   Next.js app
  backend/    Express API
```

## MVP Features

- User signup and login
- Add income and expense transactions
- View, edit, and delete transactions
- Filter transactions by type, category, and month
- Dashboard summary with income, expenses, balance, and recent transactions
- Category-wise spending breakdown

## Planned Backend API Routes

### Auth

```http
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/me
```

### Transactions

```http
POST   /api/transactions
GET    /api/transactions
GET    /api/transactions/:id
PUT    /api/transactions/:id
DELETE /api/transactions/:id
```

### Dashboard

```http
GET /api/dashboard/summary
GET /api/dashboard/monthly
GET /api/dashboard/category-breakdown
```

## Local Development Plan

The Next.js frontend will run on:

```text
http://localhost:3000
```

The Express backend will run on:

```text
http://localhost:5000
```

The frontend can call backend endpoints using:

```text
http://localhost:5000/api
```

## Team Split

### Frontend

- Build the Next.js UI
- Create pages and forms
- Call backend APIs
- Display dashboard charts and transaction data

### Backend

- Build the Express API
- Connect MongoDB
- Create models and controllers
- Implement JWT authentication
- Test APIs with Postman or Thunder Client

