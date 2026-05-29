# Polli Backend (MongoDB)

Minimal Express API using MongoDB with Mongoose.

## Requirements
- Node.js 18+
- MongoDB (local or hosted)

## Environment
Create a `.env` file:

```
MONGODB_URI=mongodb://127.0.0.1:27017/polli
JWT_SECRET=replace-with-strong-secret
```

## Run
```
npm install
npm run dev
```

## API
Base URL: `http://localhost:1000/api`

### Authentication
- Login sets an `httpOnly` cookie named `token`.
- Protected routes require the cookie (handled by `isAuthenticated`).

### Data Types (User)
- `name`: string, required, max 20, trimmed
- `nationality`: string, required, max 40, trimmed
- `email`: string, required, unique, max 40, trimmed
- `password`: string, required, min 6 (stored hashed)
- `level`: string, default `A1`, max 20

### Data Types (Progress)
- `userId`: ObjectId, required, ref `User`
- `streak`: number, default 0
- `hours`: number, default 0
- `lessons`: number, default 0
- `accuracy`: number, default 0, range 0-1
- `vocab`: number, default 0

### Endpoints
#### `POST /register`
Create a new user.

Request body:
```json
{
  "name": "string",
  "nationality": "string",
  "email": "string",
  "password": "string"
}
```

Success response:
```json
{ "message": "user created successfully" }
```

#### `POST /login`
Authenticate and set auth cookie.

Request body:
```json
{
  "email": "string",
  "password": "string"
}
```

Success response:
```json
{
  "message": "login successfully",
  "token": "jwt-string",
  "user": { "id": "string", "email": "string", "name": "string" }
}
```

#### `PUT /profile` (protected)
Update current user profile.

Request body (at least one field):
```json
{
  "name": "string",
  "password": "string"
}
```

Success response:
```json
{
  "message": "profile updated successfully",
  "user": { "id": "string", "email": "string", "name": "string" }
}
```

#### `GET /fetch-profile` (protected)
Fetch current user profile.

Success response:
```json
{
  "message": "profile fetched successfully",
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "nationality": "string",
    "level": "string"
  }
}
```

#### `GET /progress` (protected)
Fetch current user progress.

Success response:
```json
{
  "message": "progress fetched successfully",
  "progress": {
    "id": "string",
    "userId": "string",
    "streak": 0,
    "hours": 0,
    "lessons": 0,
    "accuracy": 0.0,
    "vocab": 0
  }
}
```

#### `PUT /progress` (protected)
Update current user progress (partial updates supported).

Request body (any of these fields):
```json
{
  "streak": 5,
  "hours": 2.5,
  "lessons": 12,
  "accuracy": 0.92,
  "vocab": 320
}
```

Success response:
```json
{
  "message": "progress updated successfully",
  "progress": {
    "id": "string",
    "userId": "string",
    "streak": 5,
    "hours": 2.5,
    "lessons": 12,
    "accuracy": 0.92,
    "vocab": 320
  }
}
```

### Common Error Messages
- `all fields are required`
- `invalid credentials`
- `user already exists`
- `user not found`
- `database error`
- `at least one field is required`
