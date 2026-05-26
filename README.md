# Personal Finance Tracker API

A backend-only personal finance tracker API built with Node.js, Express.js, MongoDB, and Mongoose.

## Project Structure

```text
personal-finance-tracker/
  backend/    Express API
  docs/       API documentation and Postman collection
```

## MVP Features

- User signup and login
- Add income and expense transactions
- Default and custom categories
- View, edit, and delete transactions
- Filter transactions by type, category, and month
- Dashboard summary with income, expenses, balance, and recent transactions
- Category-wise spending breakdown

## Backend API Routes

### Auth

```http
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/onboarding
PATCH /api/auth/profile
```

Signup request:

```json
{
  "name": "Abhijeet",
  "email": "abhijeet@example.com",
  "password": "password123"
}
```

Login request:

```json
{
  "email": "abhijeet@example.com",
  "password": "password123"
}
```

Auth success response:

```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "Abhijeet",
    "email": "abhijeet@example.com",
    "currentBalance": 0,
    "monthlySalary": 0,
    "onboardingComplete": false
  }
}
```

Protected routes need this header:

```http
Authorization: Bearer jwt_token_here
```

### Transactions

```http
POST   /api/transactions
GET    /api/transactions
GET    /api/transactions/:id
PUT    /api/transactions/:id
DELETE /api/transactions/:id
```

### Categories

```http
POST   /api/categories
GET    /api/categories
GET    /api/categories/:id
PUT    /api/categories/:id
DELETE /api/categories/:id
```

Transaction request:

```json
{
  "type": "expense",
  "amount": 250,
  "category": "Food",
  "description": "Lunch",
  "date": "2026-05-22",
  "paymentMethod": "upi"
}
```

Transaction filters:

```http
GET /api/transactions?type=expense&category=Food&month=5&year=2026
```

### Dashboard

```http
GET /api/dashboard/summary
GET /api/dashboard/monthly
GET /api/dashboard/category-breakdown
```

Dashboard filters:

```http
GET /api/dashboard/summary?month=5&year=2026
GET /api/dashboard/monthly?year=2026
GET /api/dashboard/category-breakdown?type=expense&month=5&year=2026
```

## Local Development Plan

The Express backend will run on:

```text
http://localhost:5000
```

## Backend Setup

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Health check:

```http
GET http://localhost:5000/api/health
```

## API Docs

- API reference: [docs/API_DOCS.md](docs/API_DOCS.md)
- Postman collection: [docs/postman_collection.json](docs/postman_collection.json)
