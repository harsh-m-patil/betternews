# BetterNews

![BetterNews Preview](assets/betternews.png)

**BetterNews** is a performant, full-stack Hacker News clone designed to showcase modern web development best practices — from optimistic UI updates to type-safe APIs — all built with cutting-edge tools like Hono, Bun, and TanStack libraries.

It features a clean, responsive interface, a robust backend with PostgreSQL, Drizzle ORM, and session-based auth using Lucia. Posts, comments, sorting, and voting are all implemented with URL-first design using TanStack Router, and validation is enforced across the stack using Zod.

## Features

- Responsive UI with React + Shadcn/UI + TailwindCSS
- Optimistic upvoting for posts and comments
- Nested commenting system with pagination
- Full auth flow using Lucia (signup, login, logout)
- URL-driven filtering and sorting (recent, top, etc.)
- Form handling via TanStack Form + Zod (type-safe)
- PostgreSQL via Drizzle ORM with schema-first approach

## Tech Stack Highlights

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)

- **Frontend:** React, TanStack Router, TanStack Query, TanStack Form, Shadcn/UI, TypeScript, Zod
- **Backend:** Hono (Bun), Lucia, Drizzle ORM, PostgreSQL, Zod

## Development Practices

- Monolithic repo with clearly separated server and client folders
- Custom error boundaries and toast-based user feedback

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) runtime
- PostgreSQL database
- Node.js (for compatibility)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/harsh-m-patil/betternews.git
cd betternews
```

2. Install dependencies:

```bash
bun install
```

3. Set up your environment variables (create `.env` file):

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/betternews"

# Auth
AUTH_SECRET="your-auth-secret-here"
```

4. Run database migrations:

```bash
bun run db:migrate
```

5. Start the development server:

```bash
bun run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
betternews/
├── api/                    # Backend API (Hono)
│   ├── db/schemas/        # Drizzle ORM schemas
│   ├── lib/               # Utility functions
│   ├── middleware/        # Authentication middleware
│   └── routes/            # API route handlers
├── client/                # Frontend React app
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── lib/           # Client utilities & API hooks
│       └── routes/        # TanStack Router pages
├── shared/                # Shared types between client/server
└── api-docs/             # API documentation (Bruno)
```

## API Documentation

The project includes comprehensive API documentation using Bruno collections located in the `api-docs/` directory. Import these into Bruno to explore and test the API endpoints.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
