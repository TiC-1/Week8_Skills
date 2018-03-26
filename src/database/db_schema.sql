BEGIN;

DROP TABLE IF EXISTS bookmarks, users;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE bookmarks (
  user_id INTEGER NOT NULL REFERENCES users(user_id),
  already_known integer[],
  interested_in integer[],
  starred integer[]
);


COMMIT;
