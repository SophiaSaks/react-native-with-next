#Next.js Playground

This is a project where I experiment with Node.js, Next.js, React, and Tailwind CSS.

## Table of Contents

- [Getting Started](#getting-started)
- [Setup Instructions](#setup-instructions)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Test Users](#test-users)

---

## Getting Started

This project includes a backend (Node.js) and a frontend (Next.js with React and Tailwind CSS). Follow the setup
instructions to run both components simultaneously.

---

## Setup Instructions

### 1. Backend Setup

1. Navigate to the `backend` folder.
2. Install dependencies:

```bash
npm install
```

4. Duplicate the provided `.env.local` file and rename it to `.env` when using it seriously.
5. The `.env.local` file has the necessary dummy configuration, such as a valid secret key.

### 2. Frontend Setup

1. Navigate to the `frontend` folder.
2. Install dependencies:

```bash
npm install
```

### 3. Running the Application

1. In the root directory of the project, install dependencies for both backend and frontend as well as the root:

```bash
npm install
```

2. Start the project (both backend and frontend will run simultaneously):

```bash
npm run dev
```

---

## Usage

1. The frontend application will be accessible at: `http://localhost:3000`
2. Click on the **Login** button to access the application.
3. Use one of the test user credentials to log in and view test data.

---

## Test Users

Here are the available test users for login:

| Email              | Password    |
|--------------------|-------------|
| sophia@example.com | password123 |
