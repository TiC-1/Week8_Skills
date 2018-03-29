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
![img_2314](https://user-images.githubusercontent.com/19515855/37901727-7b3d21d2-30f2-11e8-80e1-2378edf1aeb2.JPG)

## Setup 💻
- clone Repo
- create a Postgres DB importing our db_schema.sql & db_data.sql
- `npm i`
- `npm run setup`
- run with `npm run dev` for local testing

## Try it on Heroku!
- user example: iannis@tic.it
- password example: iannis

## Stretch goals


## Repository structure

- server.js
- _public_
  - index.html
  - main.css
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
