# Week8_Skills
Full-stack project with all the JS knowledge gained in "Turn into coders" bootcamp.

## General purpose
At the end of our bootcamp period we've decided to group in a web application all the JS knowledge

## User stories
As a user I want to:
1. see JS skills in a "tree view".
2. filter skills by:
  - bootcamp prerequisites
  - bootcamp learning outcomes
  - others (post bootcamp)
  - bookmarks
3. bookmark skills i'm interested in:
  - favorites
  - already known
  - interested to learn

## User mapping

## Wireframe

## Setup 💻
- clone Repo
- create a postrgres DB importing our db_schema.sql & db_data.sql
- "npm i" or "npm install"
- run with "npm run dev" for local testing

## Try it on Heroku!
- user example: iannis@tic.it
- password example: iannis

## Stretch goals


## Repository structure

- server.js
- _public_
  -front end team
- _src_
  - router.js
  - handler.js _(could several files)_
  - _database_
    - db_connection.js
    - db_populate.js
    - db_schema.sql
    - db_data.sql
  - _queries_
- _test_

## Database schema
2 tables:
- users
  - id _(auto incremental)_
  - username
  - email
  - PASSWORD
- posts
  - id _(auto incremental)_
  - title
  - content
  - like BOOLEAN
  - FOREIGN KEY (user_id) REFERENCES users (id)

  ## General purpose
  Create a login App using a database and express.
  Our week project employs the use of cookies and jwts (using the npm module jsonwebtoken) to maintain a logged in state through different pages. Via a database, the username and password are stored and verified as correct using the bcryptjs npm module upon login.
  Coding will be assign to 2 different teams: front-end and back-end. Development will be TDD on both client and server side.
