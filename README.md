# Lunari Movies

Frontend part of web-application for watching and discovering films and series made using [Next.js](https://nextjs.org/)
framework and [GraphQL](https://graphql.org/).
Discover server [here](https://github.com/AshedFox/lunari-movie-server).

## Features

- Discover films and series with wide filtering and sort system
- Watch movies with quality and language which better for you
- Add movies to watched, favorite and bookmarked
- Write reviews on movies you liked (or disliked)
- Users profiles
- Discover and create collections with movies
- Purchase movies or subscribe on service
  
#### TODO
- Add movies lists, collections lists and comments to user profile page
- Implement rooms for watching movies together

## Installation
1. Install dependencies
```bash
$ npm install
```

2. Generate types from graphql schema 
```bash
# generate types once
$ npm run codegen:write
```
```bash
# or watch for changes
$ npm run codegen:watch
```

3. Run the app
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
- Home
<img alt="home_page" src="https://github.com/user-attachments/assets/b1fdda7c-15d6-41da-9483-2a7eb2c48201" />

- Explore
<img alt="explore_page" src="https://github.com/user-attachments/assets/fd0c985e-5081-47f7-812e-55f465068235" />

- Film
<img alt="film_page_with_reviews" src="https://github.com/user-attachments/assets/23a9c218-faa0-45f3-b0f4-e92da5458d0a" />

- Collections
<img alt="collections_page" src="https://github.com/user-attachments/assets/69890c92-c803-487d-81e5-d06f3f575d41" />

- Collection
<img alt="collection_page" src="https://github.com/user-attachments/assets/95c741ec-ea45-4d86-a823-1faf02bfd77e" />

- User settings
<img alt="user_settings" src="https://github.com/user-attachments/assets/a05ba7ae-09ac-4e9a-b1a4-68c52a997c47" />
