# Task Management React App

## Overview

The Task Management React App is a comprehensive application designed to help users manage their tasks efficiently. The application includes features such as user authentication, task creation, update, deletion, and categorization. It also provides a seamless user experience with responsive design and accessibility standards.

## Table of Contents

-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
-   [Running the App](#running-the-app)
-   [Running the Backend](#running-the-backend)
-   [Running the E2E Cypress test cases](#running-the-backend)
-   [API Documentation](#api-documentation)
-   [Contributing](#contributing)
-   [License](#license)

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

-   [Node.js](https://nodejs.org/en/download/) (v14.x or later)
-   [npm](https://www.npmjs.com/get-npm) (v6.x or later)

### Installation

1. **Clone the repository**

    ```sh
    git clone https://github.com/rishabh7g/task-management.git
    cd task-management-app
    ```

2. **Install dependencies for backend, frontend and testing**

    ```bash
    # From the root directory
    npm run install-deps
    ```

## Running the App

To start the frontend development server, follow these steps:

1. **Ensure the `.env` file of frontend is configured correctly**

    The `.env` file should contain the following environment variable:

    ```env
    REACT_APP_API_BASE_URL=http://localhost:8090
    ```

2. **Ensure the `.env` file of backend is configured correctly**

    The `.env` file should contain the following environment variables:

    ```env
    PORT=8090
    ACCESS_TOKEN_EXPIRES_IN=10s
    REFRESH_TOKEN_EXPIRES_IN=15m
    ACCESS_TOKEN_SECRET=your-access-token-secret
    REFRESH_ACCESS_TOKEN_SECRET=your-refresh-token-secret
    FRONTEND_URL=http://localhost:3000
    ```

3. **Start the servers**

    ```bash
    # From the root directory
    npm run start-servers
    ```

    The backend server should now be running on [http://localhost:8090](http://localhost:8090).
    The frontend server should now be running on [http://localhost:3000](http://localhost:3000).

## Running Cypress E2E Tests

### Prerequisites

Make sure you have installed all the dependencies for both the frontend and backend:

    ```bash
    # From the root directory
    npm run install-deps
    ```

### Running the tests

To run the Cypress E2E tests, follow these steps:

    ```bash
    # From the root directory
    npm run test:ui
    ```

    This will open the Cypress Test Runner, where you can select and run the test cases.

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

## Features

-   **Husky + Prettier + ESLint + lint-staged**: To enable effective coding practices, we use Husky for Git hooks, Prettier for code formatting, ESLint for linting, and lint-staged to run these tools pre-commit.
-   **Tailwind CSS**: We advise against using external CSS files. Instead, use Tailwind CSS for styling to maintain consistency and utility-first CSS principles.
-   **Clean Code**: All code should be written in a clean, concise, and descriptive format. Follow best practices for readability and maintainability.
-   **Accessibility (a11y)**: All code is written based on accessibility principles to ensure the application is usable by everyone, including those with disabilities.

## Getting Started

### Starting the Main Server

To start the main server, run the following command:

    ```bash
    # From the root directory
    npm run start-servers
    ```

This will start the development server and you can view the application in your browser at `http://localhost:3000`.

### Using Storybook

Storybook is used for developing UI components in isolation. To start Storybook, run the following command:

    ```bash
    # From the root directory
    npm run storybook
    ```

This will start the Storybook server and you can view the UI components in your browser at `http://localhost:6006`.

### Running Unit Tests of frontend(jest)

Jest is used for unit testing. To run Jest tests, use the following command:

    ```bash
    # From the root directory
    npm run test:unit
    ```

This will run all the tests using Jest and display the results in the terminal.
