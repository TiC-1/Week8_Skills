BEGIN;

DROP TABLE IF EXISTS bookmarks, users;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE bookmarks (
  user_idd INTEGER NOT NULL,
  already_known json,
  interested_in json,
  starred json,
  CONSTRAINT fk_bookmaarks_user_id FOREIGN KEY (user_idd) REFERENCES users (user_id)
);


COMMIT;
