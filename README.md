
# Task Management React App

## Overview

The Task Management React App is a comprehensive application designed to help users manage their tasks efficiently. The application includes features such as user authentication, task creation, update, deletion, and categorization. It also provides a seamless user experience with responsive design and accessibility standards.

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Backend](#running-the-backend)
- [Running the Frontend](#running-the-frontend)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

```
task-management-app/
│
├── backend/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── swagger.js
│
├── frontend/
│   ├── .env
│   ├── package.json
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.tsx
│       └── index.tsx
│
├── README.md
└── .gitignore
```

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/) (v14.x or later)
- [npm](https://www.npmjs.com/get-npm) (v6.x or later)

### Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/your-username/task-management-app.git
   cd task-management-app
   ```

2. **Install dependencies for both backend and frontend**

   ```sh
   # Navigate to the backend directory and install dependencies
   cd backend
   npm install

   # Navigate to the frontend directory and install dependencies
   cd ../frontend
   npm install
   ```

## Running the Backend

To start the backend server, follow these steps:

1. **Navigate to the backend directory**

   ```sh
   cd backend
   ```

2. **Ensure the `.env` file is configured correctly**

   The `.env` file should contain the following environment variables:

   ```env
   PORT=8090
   ACCESS_TOKEN_EXPIRES_IN=10s
   REFRESH_TOKEN_EXPIRES_IN=15m
   ACCESS_TOKEN_SECRET=your-access-token-secret
   REFRESH_ACCESS_TOKEN_SECRET=your-refresh-token-secret
   FRONTEND_URL=http://localhost:3000
   ```

3. **Start the backend server**

   ```sh
   npm start
   ```

   The backend server should now be running on [http://localhost:8090](http://localhost:8090).

## Running the Frontend

To start the frontend development server, follow these steps:

1. **Navigate to the frontend directory**

   ```sh
   cd frontend
   ```

2. **Ensure the `.env` file is configured correctly**

   The `.env` file should contain the following environment variable:

   ```env
   REACT_APP_API_BASE_URL=http://localhost:8090
   ```

3. **Start the frontend development server**

   ```sh
   npm start
   ```

   The frontend server should now be running on [http://localhost:3000](http://localhost:3000).

## API Documentation

To view the API documentation, follow these steps:

1. **Ensure the backend server is running**

2. **Open your browser and navigate to the Swagger UI**

   ```url
   http://localhost:8090/api-docs
   ```

   This will display the Swagger UI, which provides interactive documentation for all available API endpoints.

## Contributing

We welcome contributions from the community. To contribute, follow these steps:

1. **Fork the repository**

2. **Create a new branch**

   ```sh
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**

4. **Commit your changes**

   ```sh
   git commit -m "Add your commit message"
   ```

5. **Push to your branch**

   ```sh
   git push origin feature/your-feature-name
   ```

6. **Create a pull request**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
