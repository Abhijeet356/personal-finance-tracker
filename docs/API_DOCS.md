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
    "email": "abhijeet@example.com"
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
    "email": "abhijeet@example.com"
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
    "email": "abhijeet@example.com"
  }
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

## Frontend Notes

- Store the token after signup/login.
- Send the token in the `Authorization` header for protected routes.
- Use `http://localhost:5000/api` as `NEXT_PUBLIC_API_URL` during local development.
- Keep `.env.local` on the frontend out of Git.

