# Lunari Movies

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset='https://github.com/user-attachments/assets/16e44440-d797-4a58-ab28-e05d1ba7c47e' />
    <img src='https://github.com/user-attachments/assets/16e44440-d797-4a58-ab28-e05d1ba7c47e' alt='Lunari Movies Banner' />

  </picture>

 **A modern, feature-rich movie streaming platform built with Next.js and GraphQL**

 [Tech Stack](#tech-stack) | [Features](#features) | [Installation](#installation) | [Gallery](#gallery)

</div>

## Overview

**Lunari Movies** is a powerfull web application for discovering, watching, managing films and series and much-much more built with modern tech stack.

> Backend Repository: [lunari-movie-server](https://github.com/AshedFox/lunari-movie-server)

## Tech Stack

- **[Next.js 15](https://nextjs.org/)**
- **[React 19](https://react.dev/)**
- **[Apollo Client](https://www.apollographql.com/docs/react/)**
- **[GraphQL](https://graphql.org/)**
- **[Tailwind CSS](https://tailwindcss.com/)**
- **[shadcn/ui](https://ui.shadcn.com/)**
- **[Vidstack](https://www.vidstack.io/)** - modern video player
- **[React Hook Form](https://react-hook-form.com/)**
- **[Zod](https://zod.dev/)**

## Features

- Films and series with generes, images, persons, and many other more basic information.
- Films and series search with powerful filtering system and multiple sort options.
- Adaptive quality streaming with DASH support.
- Episode-based series navigation.
- Personal watchlists (watched, favorites, bookmarks).
- User profiles with customization.
- Reviews and rating system.
- System and user-created collections of movies with reviews support.
- Subscriptions and one-time movie purchases with Stripe integration
- Responsive design for all devices
- Dark/Light theme support
- Optimized performance with Next.js features.

## TODO

- [ ] Сo-viewing films and series in rooms.

## Installation

### Prerequisites

- **Node.js 18+**  
- **GraphQL API** (see [backend](https://github.com/AshedFox/lunari-movie-server))

### Setup

1. Clone repository

```bash
git clone https://github.com/AshedFox/lunari-movie-client.git
cd lunari-movie-client
```

2. Install dependencies

```bash
npm install
```

3. Set enviromental variables (e.g. with .env file)

| Variable                 | Description              | Required |
| ------------------------ | ------------------------ | -------- |
| `NEXT_PUBLIC_API_URL`    | GraphQL API endpoint     |    +     |
| `NEXT_PUBLIC_STRIPE_KEY` | Stripe bulic key         |    +     |
| `ACCESS_COOKIE_KEY`      | Access token cookie key  |    +     |
| `REFRESH_COOKIE_KEY`     | Refresh token cookie key |    +     |
| `USER_COOKIE_KEY`        | User data cookie key     |    +     |
| `PORT`                   | Port                     |          |
| `NEXT_PUBLIC_IMAGES_URL` | Images storage base URL  |          |

4. Generate types from graphql schema

```bash
# generate types once
$ npm run codegen:write
```

```bash
# or watch for changes
$ npm run codegen:watch
```

5. Run the app

```bash
# development
$ npm run dev
```

```bash
# production
$ npm run build
$ npm run start
```

## Gallery

### Home page

![Home Page](https://github.com/user-attachments/assets/16e44440-d797-4a58-ab28-e05d1ba7c47e)

### Explore page

![Explore Page](https://github.com/user-attachments/assets/124ac158-66dd-468c-a6fa-8e3cb3c50fa4)


### Film page (with reviews)

![Film Page](https://github.com/user-attachments/assets/25709203-7d9b-401d-b63b-31a113ffe66a)


### Collections page

![Collections Page](https://github.com/user-attachments/assets/69890c92-c803-487d-81e5-d06f3f575d41)

### Collection page

![Collection Page](https://github.com/user-attachments/assets/95c741ec-ea45-4d86-a823-1faf02bfd77e)

### User Profile

![User Profile](https://github.com/user-attachments/assets/868ce224-c7c0-48d4-aaaf-e211ddfad5a5)

### User settings page

![User Settings](https://github.com/user-attachments/assets/a05ba7ae-09ac-4e9a-b1a4-68c52a997c47)
