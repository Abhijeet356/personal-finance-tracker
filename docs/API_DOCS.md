# Personal Finance Tracker API Docs

Base URL for local development:

```text
http://localhost:5000/api
```

Protected routes require this header:

```http
Authorization: Bearer <token>
```

## Health

### Check API Status

```http
GET /health
```

Success response:

```json
{
  "success": true,
  "message": "Personal Finance Tracker API is healthy"
}
```

## Auth

### Signup

```http
POST /auth/signup
```

Request body:

```json
{
  "name": "Abhijeet",
  "email": "abhijeet@example.com",
  "password": "password123"
}
```

Success response:

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

### Login

```http
POST /auth/login
```

Request body:

```json
{
  "email": "abhijeet@example.com",
  "password": "password123"
}
```

Success response:

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

### Get Current User

```http
GET /auth/me
```

Headers:

```http
Authorization: Bearer <token>
```

Success response:

```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "Abhijeet",
    "email": "abhijeet@example.com",
    "currentBalance": 25000,
    "monthlySalary": 50000,
    "onboardingComplete": true
  }
}
```

### Complete Onboarding

```http
POST /auth/onboarding
```

Headers:

```http
Authorization: Bearer <token>
```

Request body:

```json
{
  "currentBalance": 25000,
  "monthlySalary": 50000
}
```

Success response:

```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "Abhijeet",
    "email": "abhijeet@example.com",
    "currentBalance": 25000,
    "monthlySalary": 50000,
    "onboardingComplete": true
  }
}
```

### Update Profile

```http
PATCH /auth/profile
```

Headers:

```http
Authorization: Bearer <token>
```

Request body can contain one or both profile fields:

```json
{
  "currentBalance": 30000,
  "monthlySalary": 55000
}
```

## Transactions

### Create Transaction

```http
POST /transactions
```

Headers:

```http
Authorization: Bearer <token>
```

Request body:

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

Allowed values:

```text
type: income, expense
paymentMethod: cash, card, upi, bank_transfer, other
```

### Get Transactions

```http
GET /transactions
```

Optional filters:

```http
GET /transactions?type=expense&category=Food&month=5&year=2026
```

Success response:

```json
{
  "success": true,
  "count": 1,
  "transactions": []
}
```

### Get Single Transaction

```http
GET /transactions/:id
```

### Update Transaction

```http
PUT /transactions/:id
```

Request body can contain one or more transaction fields:

```json
{
  "amount": 300,
  "description": "Updated lunch"
}
```

### Delete Transaction

```http
DELETE /transactions/:id
```

Success response:

```json
{
  "success": true,
  "message": "Transaction deleted"
}
```

## Categories

New users automatically receive default income and expense categories.

### Create Category

```http
POST /categories
```

Headers:

```http
Authorization: Bearer <token>
```

Request body:

```json
{
  "name": "Books",
  "type": "expense",
  "color": "#2563EB"
}
```

Allowed values:

```text
type: income, expense
color: hex color, for example #2563EB
```

### Get Categories

```http
GET /categories
```

Optional filter:

```http
GET /categories?type=expense
```

Success response:

```json
{
  "success": true,
  "count": 1,
  "categories": []
}
```

### Get Single Category

```http
GET /categories/:id
```

### Update Category

```http
PUT /categories/:id
```

Request body can contain one or more category fields:

```json
{
  "name": "Books and Study",
  "color": "#1D4ED8"
}
```

### Delete Category

```http
DELETE /categories/:id
```

Success response:

```json
{
  "success": true,
  "message": "Category deleted"
}
```

## Dashboard

### Summary

```http
GET /dashboard/summary
```

Optional filters:

```http
GET /dashboard/summary?month=5&year=2026
```

Success response:

```json
{
  "success": true,
  "totalIncome": 50000,
  "totalExpenses": 18500,
  "balance": 31500,
  "recentTransactions": []
}
```

### Monthly Trend

```http
GET /dashboard/monthly
```

Optional filters:

```http
GET /dashboard/monthly?year=2026
```

### Category Breakdown

```http
GET /dashboard/category-breakdown
```

Optional filters:

```http
GET /dashboard/category-breakdown?type=expense&month=5&year=2026
```

## Common Error Response

```json
{
  "success": false,
  "message": "Error message here"
}
```

## Backend Notes

- Store the token returned by signup/login in the client or API consumer.
- Send the token in the `Authorization` header for protected routes.
- Use `http://localhost:5000/api` as the local API base URL.
