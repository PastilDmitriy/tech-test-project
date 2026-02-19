# Questplay — Tech Test Project

A Next.js 16 gaming portal built with React 19, TypeScript, Tailwind CSS, and daisyUI. The project showcases a responsive game catalog with search, category browsing, and interactive features.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **React:** 19.x
- **Styling:** Tailwind CSS 4, daisyUI
- **Language:** TypeScript
- **Testing:** Jest, React Testing Library
- **Tooling:** ESLint, Prettier, Husky, lint-staged

## Getting Started

### Prerequisites

- Node.js 20+
- npm (or yarn/pnpm)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Scripts

| Command                | Description               |
| ---------------------- | ------------------------- |
| `npm run dev`          | Start development server  |
| `npm run build`        | Build for production      |
| `npm start`            | Start production server   |
| `npm test`             | Run unit tests            |
| `npm run test:watch`   | Run tests in watch mode   |
| `npm run lint`         | Run ESLint                |
| `npm run lint:fix`     | Fix ESLint issues         |
| `npm run format`       | Format code with Prettier |
| `npm run format:check` | Check code formatting     |

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/games/          # API routes
│   │   ├── categories/     # GET /api/games/categories
│   │   ├── [category]/     # GET /api/games/[category]
│   │   │   └── count/      # GET /api/games/[category]/count
│   │   └── search/         # GET /api/games/search?q=&category=&limit=&offset=
│   ├── games/[category]/   # Category page (e.g. /games/slots)
│   ├── play/[gameId]/      # Play page (e.g. /play/5xmagic)
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/            # Shared components
│   ├── GameCard/           # Game card with link to play
│   └── Modal/              # Reusable modal
├── features/               # Feature-based modules
│   ├── Games/              # Category page, grid, load more
│   ├── HomePage/           # Home page sections, Fibonacci demo
│   └── Layout/             # Header, Footer, Search, GoHomeButton
├── mocks/games/            # Mock game data (JSON)
├── providers/              # React context (GameDataProvider)
├── services/games/         # Game data services
├── types/                  # TypeScript types
└── lib/                    # Utilities
```

## Server-Side vs Client-Side Components

Next.js App Router uses Server Components by default. Components with the `"use client"` directive run on the client (browser).

### Server Components (9)

| Component           | Location                                                     |
| ------------------- | ------------------------------------------------------------ |
| HomePage            | `features/HomePage/HomePage.tsx`                             |
| Layout              | `features/Layout/Layout.tsx`                                 |
| GamesSection        | `features/HomePage/components/GamesSection/GamesSection.tsx` |
| GameCard            | `components/GameCard/GameCard.tsx`                           |
| Footer              | `features/Layout/components/Footer/Footer.tsx`               |
| Root layout         | `app/layout.tsx`                                             |
| Home page           | `app/page.tsx`                                               |
| Play page           | `app/play/[gameId]/page.tsx`                                 |
| Games category page | `app/games/[category]/page.tsx`                              |

### Client Components (8)

| Component         | Location                                                               |
| ----------------- | ---------------------------------------------------------------------- |
| FibonacciSequence | `features/HomePage/components/FibonacciSequence/FibonacciSequence.tsx` |
| Search            | `features/Layout/components/Search/Search.tsx`                         |
| GoHomeButton      | `features/Layout/components/GoHomeButton/GoHomeButton.tsx`             |
| Header            | `features/Layout/components/Header/Header.tsx`                         |
| CategoryGamesGrid | `features/Games/components/CategoryGamesGrid/CategoryGamesGrid.tsx`    |
| CategoryPageTitle | `features/Games/components/CategoryPageTitle/CategoryPageTitle.tsx`    |
| Modal             | `components/Modal/Modal.tsx`                                           |
| GameDataProvider  | `providers/GameDataProvider.tsx`                                       |

## Features

- **Home Page:** Fibonacci sequence demo (Part 2) with "Show solution" button, game sections by category with total counts
- **Search:** Modal search with text input, category filter, game results grid (responsive 2/3/4 columns), load more
- **Category Pages:** Full game list per category with pagination ("See more")
- **Game Cards:** Clickable cards linking to play page
- **Auth:** Log in / Sign up buttons opening a "Coming soon" modal
- **Layout:** Responsive header (mobile: 2 columns, desktop: single row), footer, "Go home" on non-home pages
- **Play Page:** Placeholder for game functionality

## API Endpoints

| Endpoint                      | Method | Description                                   |
| ----------------------------- | ------ | --------------------------------------------- |
| `/api/games/categories`       | GET    | List all game categories                      |
| `/api/games/[category]`       | GET    | Get games by category (`?limit=&offset=`)     |
| `/api/games/[category]/count` | GET    | Get game count for category                   |
| `/api/games/search`           | GET    | Search games (`?q=&category=&limit=&offset=`) |

## Git Hooks

- **pre-commit:** Runs lint-staged (Prettier + ESLint on staged files)
- **pre-push:** Runs `npm test`

## Testing

Unit tests cover:

- GameCard, Modal, Header, Footer, GoHomeButton
- Search, CategoryPageTitle, CategoryGamesGrid
- GamesSection

```bash
npm test
```

## License

Private project.
