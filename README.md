# Lunari Movies

## Description

Frontend part of web-application for watching and discovering films and series made using [Next.js](https://nextjs.org/)
framework and [GraphQL](https://graphql.org/).
Discover server [here](https://github.com/AshedFox/lunari-movie-server).

## Features

- Discover films and series with wide filtering and sort system
- Watch movies with quality and language which better for you
- Add movies to watched, favorite and bookmarked
- Write reviews on movies you liked (or disliked)
- Users profiles
#### TODO:
- Discover and create collections with movies
- Purchase movies or subscribe on service
- Users profiles with lists of movies they added to lists and with their comments
- Rooms to watch movies together

## Installation

```bash
$ npm install
```

## Before running the app

```bash
# generate graphql types once
$ npm run codegen:write

# or watch for changes
$ npm run codegen:watch
```

## Running the app

```bash
# development
$ npm run dev

# production
$ npm run build
$ npm run start
```
