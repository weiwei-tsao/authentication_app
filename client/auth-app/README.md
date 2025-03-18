# Authentication App

A modern React TypeScript application with authentication features built using Vite, Material UI, React Hook Form, and Apollo Client for GraphQL integration.

## Features

- User authentication (login, signup, logout)
- Password reset functionality
- Protected routes
- Responsive design with Material UI
- Form validation with React Hook Form
- State management with Apollo Client cache, Context API and useReducer
- Type-safe GraphQL operations with codegen
- Modern development setup with Vite

## Tech Stack

- **React**: A JavaScript library for building user interfaces
- **TypeScript**: Typed JavaScript for better developer experience
- **Vite**: Next generation frontend tooling
- **Apollo Client**: Powerful GraphQL client with caching
- **Material UI (MUI)**: React components for faster and easier web development
- **React Hook Form**: Performant, flexible and extensible forms with easy-to-use validation
- **React Router**: Declarative routing for React
- **React Icons**: Popular icons in your React projects
- **GraphQL Codegen**: Automatic type generation for GraphQL operations

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
├── graphql/        # GraphQL queries, mutations, and generated types
├── types/          # Additional TypeScript type definitions
└── utils/          # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
cd client/auth-app
npm install
# or
yarn
```

3. Generate GraphQL types:

```bash
npm run codegen
# or
yarn codegen
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev`: Start development server and generate GraphQL types
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
- `npm run codegen`: Generate GraphQL types

## GraphQL Integration

The application uses Apollo Client for GraphQL integration. The setup includes:

- Automatic type generation for queries and mutations
- Apollo Client cache for state management
- Type-safe GraphQL operations
- Optimistic UI updates
- Error handling and loading states

## Environment Variables

Create a `.env` file with:

```
VITE_GRAPHQL_URL=http://localhost:4000/graphql
```

## License

MIT
