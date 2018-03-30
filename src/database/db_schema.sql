BEGIN;

DROP TABLE IF EXISTS bookmarks, users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE bookmarks (
  user_id INTEGER NOT NULL,
  already_known json,
  interested_in json,
  starred json,
  CONSTRAINT fk_bookmarks_user_id FOREIGN KEY (user_id) REFERENCES users (id)
);

COMMIT;
