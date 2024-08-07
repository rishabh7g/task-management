# Task Management React App

## Overview

The Task Management React App is a comprehensive application designed to help users manage their tasks efficiently. The application includes features such as user authentication, task creation, update, deletion, and categorization. It also provides a seamless user experience with responsive design and accessibility standards.

## Table of Contents

-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
-   [Running the App](#running-the-app)
-   [Running the Tests](#running-the-tests)
    -   [Running Unit Tests of frontend(jest)](#running-unit-tests-of-frontendjest)
    -   [Running the E2E tests](#running-the-e2e-tests)
-   [Running Storybook](#running-storybook)
-   [API Documentation](#api-documentation)
-   [Contributing](#contributing)
-   [License](#license)
-   [Features](#features)

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

## Running the Tests

### Prerequisites

1. Make sure you have installed all the dependencies for both the frontend and backend:

    ```bash
    # From the root directory
    npm run install-deps
    ```

### Running Unit Tests of frontend(jest)

1. Jest is used for unit testing. To run Jest tests, use the following command:

    ```bash
    # From the root directory
    npm run test:unit
    ```

    This will run all the tests using Jest and display the results in the terminal.

### Running the E2E tests

1. To run the Cypress E2E tests, follow these steps:

    ```bash
    # From the root directory
    npm run test:ui
    ```

    This will open the Cypress Test Runner, where you can select and run the test cases.

## Running Storybook

1. Storybook is used for developing UI components in isolation. To start Storybook, run the following command:

    ```bash
    # From the root directory
    npm run storybook
    ```

This will start the Storybook server and you can view the UI components in your browser at `http://localhost:6006`.

This will run all the tests using Jest and display the results in the terminal.

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
-   **Responsive Design**: The application should be responsive and work on all devices, including desktops, tablets, and mobile phones.
-   **User Authentication**: The application should have user authentication features, including login, registration, and password reset.
-   **UI Component Library**: Use Storybook to develop and showcase UI components in isolation.
-   **API Documentation**: Use Swagger UI to provide interactive documentation for all available API endpoints.
-   **Testing**: Write unit tests using Jest and E2E tests using Cypress to ensure the application is bug-free and works as expected.
