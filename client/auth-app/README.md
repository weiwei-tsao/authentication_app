# Authentication App

A modern React TypeScript application with authentication features built using Vite, Material UI, React Hook Form, and React Router.

## Features

- User authentication (login, signup, logout)
- Password reset functionality
- Protected routes
- Responsive design with Material UI
- Form validation with React Hook Form
- State management with Context API and useReducer

## Tech Stack

- **React**: A JavaScript library for building user interfaces
- **TypeScript**: Typed JavaScript for better developer experience
- **Vite**: Next generation frontend tooling
- **Material UI (MUI)**: React components for faster and easier web development
- **React Hook Form**: Performant, flexible and extensible forms with easy-to-use validation
- **React Router**: Declarative routing for React
- **React Icons**: Popular icons in your React projects

## Project Structure

```
src/
├── assets/         # Static assets like images, fonts, etc.
├── components/     # Reusable components
│   ├── auth/       # Authentication related components
│   └── layout/     # Layout components
├── context/        # React context for state management
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── services/       # API services
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Test Credentials

For testing purposes, you can use the following credentials:

- Email: test@example.com
- Password: password

## Backend Integration

The application is designed to work with a GraphQL backend. Currently, it uses mock data for testing purposes. To connect to a real backend:

1. Update the API service functions in the `src/services` directory
2. Replace the mock authentication logic in the `AuthContext.tsx` file

## License

MIT
