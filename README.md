# Authentication System

A modern full-stack authentication system built with TypeScript, featuring a GraphQL API and a React-based frontend.

## System Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│    Frontend     │         │     Backend     │         │    Database     │
│   React + MUI   │ ←─────→ │  Node + GraphQL │ ←─────→ │    MongoDB     │
└─────────────────┘   HTTP  └─────────────────┘  Query  └─────────────────┘
```

## Key Features

- Type-safe GraphQL API
- JWT-based authentication with secure cookies
- Modern React frontend with Material UI
- MongoDB database with Typegoose

## Tech Stack Overview

### Frontend

- React with TypeScript
- Apollo Client for GraphQL
- Material UI components
- GraphQL Code Generation

### Backend

- Node.js with Express
- Apollo Server for GraphQL
- MongoDB with Typegoose
- JWT authentication

## Quick Start

1. Start the backend:

```bash
cd server
npm install
npm run dev
```

2. Start the frontend:

```bash
cd client/auth-app
npm install
npm run dev
```

For detailed setup and configuration, see:

- [Frontend Documentation](./client/auth-app/README.md)
- [Backend Documentation](./server/README.md)

## License

MIT
