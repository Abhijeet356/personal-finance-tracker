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
- Monthly budget tracking with exceeded-budget status

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
  "password": "password123",
  "monthlyBudget": 20000
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
    "monthlyBudget": 20000,
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

Summary includes the saved total balance plus monthly budget status:

```json
{
  "success": true,
  "totalIncome": 50000,
  "totalExpenses": 22000,
  "balance": 78000,
  "monthlyBudget": 20000,
  "budgetUsed": 22000,
  "budgetRemaining": -2000,
  "isBudgetExceeded": true,
  "recentTransactions": []
}
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

## Deployment

Recommended setup:

- Backend: Render web service from `backend/`
- Frontend: Vercel project from the repository root
- Database: MongoDB Atlas

### Backend on Render

Create a new Render web service from this repo or use the included `render.yaml` blueprint.

Render settings:

```text
Root Directory: backend
Build Command: npm install
Start Command: npm start
Health Check Path: /api/health
```

Environment variables:

```text
MONGO_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<a long random secret>
CLIENT_URL=<your Vercel frontend URL>
CLIENT_URLS=<optional comma-separated extra frontend origins>
```

The API requires a working `MONGO_URI` at startup. `/api/health` returns `503`
until MongoDB is connected, so failed database configuration is visible to the
hosting platform instead of producing a healthy but unusable API.

### Frontend on Vercel

Create a new Vercel project from this repository.

Vercel settings:

```text
Root Directory: leave empty / default
Build Command: npm run build
Install Command: npm install
Output Directory: leave empty / default
```

Environment variables:

```text
NEXT_PUBLIC_API_BASE_URL=<your Render backend URL>/api
```

After both deploys are live, update `CLIENT_URL` in Render to the final Vercel URL and redeploy the backend.
For Vercel preview deployments, the backend also accepts `*.vercel.app` origins.
Use `CLIENT_URLS` if you add custom preview or staging domains.

## API Docs

- API reference: [docs/API_DOCS.md](docs/API_DOCS.md)
- Postman collection: [docs/postman_collection.json](docs/postman_collection.json)
