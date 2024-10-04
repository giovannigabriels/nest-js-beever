## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

### 2. Install dependencies

After cloning the repository, navigate into the project folder and install all required dependencies using Yarn:

```bash
yarn install
```

### 3. Create database

Ensure PostgreSQL is installed and running on your machine. Then, create a new database using the following SQL command
```bash
CREATE DATABASE giovanni;
```
### 4. Start the development server

You can start the development server using Yarn:

```bash
yarn start:dev
```
The server will start running on http://localhost:3000.

### 5. Testing the API

You can test the API endpoints using tools like [Postman](https://www.postman.com/). Below are the key endpoints for user registration, login, and accessing protected routes.

#### 1. Register a new user:

- **Endpoint**: `POST /user/register`
- **Request Body (JSON)**:
  ```json
  {
    "email": "user@example.com",
    "password": "YourPassword123!"
  }

- **Response success 201**:
  ```json
  {
    "message": "user@example.com success register",
  }


#### 2. Login user

- **Endpoint**: `POST /user/login`
- **Request Body (JSON)**:
  ```json
  {
    "email": "user@example.com",
    "password": "YourPassword123!"
  }
- **Response success 201**:
  ```json
  {
    "email": "user@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdpb3Zhbm5pZ2FicmllbDYxOUBnbWFpbC5jb20iLCJpYXQiOjE3MjgwNTcwMTcsImV4cCI6MTcyODE0MzQxN30.Xu4oaMdVSM7A0K0ByraUTRFmvqEs5T9ED7SZsy1sJFM"
  }

#### 3. Access protected API (Kanye quote)

- **Endpoint**: `GET /user/kanye-quote`

- **Request Headers**:
  ```bash
  Authorization: Bearer <your_jwt_token>
  ```
- **Response success 200**:
  ```json
  {
    "quote": "I feel like I'm too busy writing history to read it.",
  }
