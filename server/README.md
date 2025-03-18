# Authentication App Backend

A modern GraphQL server built with Node.js, Express, Apollo Server, and Type-GraphQL, providing type-safe authentication services for the Authentication App frontend.

## Features

- GraphQL API with Apollo Server
- Type-safe schema with Type-GraphQL
- User authentication (register, login, logout)
- Password reset functionality
- JWT-based authentication with HTTP-only cookies
- MongoDB integration with Typegoose
- Input validation with class-validator
- Environment variable configuration
- TypeScript for type safety

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express**: Web application framework
- **TypeScript**: Typed JavaScript
- **Apollo Server Express**: GraphQL server
- **Type-GraphQL**: Create GraphQL schema using TypeScript classes
- **MongoDB**: NoSQL database
- **Typegoose**: TypeScript-first Mongoose models
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **class-validator**: Input validation
- **cors**: Cross-Origin Resource Sharing

## Project Structure

```
src/
├── config/         # Configuration files
├── graphql/        # GraphQL schema definitions and resolvers
├── middlewares/     # Express middleware
├── models/         # Database models
├── repositories/   # Data access layer
├── routes/         # Express routes (if any)
├── services/       # Business logic layer
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── app.ts          # Express app configuration
├── apolloServer.ts # Apollo Server setup
├── schema.graphql  # GraphQL schema
└── server.ts       # Server entry point
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- MongoDB (v6.0 or later)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
cd server
npm install
# or
yarn
```

3. Set up environment variables:
   Create a `.env` file in the root directory with:

```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/auth_app
JWT_SECRET=your_jwt_secret
COOKIE_SECRET=your_cookie_secret
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

## Environment Variables

The following environment variables are required:

- `PORT`: Server port number (default: 4000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT tokens
- `COOKIE_SECRET`: Secret for cookie signing
- `CORS_ORIGIN`: Frontend application URL
- `NODE_ENV`: Node environment (development/production)

## GraphQL Schema

### Types

- `User`: User entity with authentication details
- `AuthResponse`: Authentication response with token and user data
- `Error`: Standard error type for GraphQL responses

### Queries

- `me`: Get current authenticated user
- `users`: List all users (admin only)

### Mutations

- `register`: Register new user
- `login`: User login
- `logout`: User logout
- `forgotPassword`: Request password reset
- `resetPassword`: Reset password
- `updateProfile`: Update user profile

## Available Scripts

- `npm run start`: Start production server
- `npm run dev`: Start development server with hot-reload
- `npm run build`: Build for production
- `npm run lint`: Run ESLint

## Security Features

- Password hashing with bcryptjs
- JWT tokens with HTTP-only cookies
- CORS configuration
- Input validation with class-validator
- Type-safe GraphQL operations
- Request size limiting
- Secure cookie options

## Type Safety

The application uses several layers of type safety:

- TypeScript for general type safety
- Type-GraphQL for GraphQL schema type safety
- Typegoose for MongoDB model type safety
- class-validator for runtime validation

## License

MIT
