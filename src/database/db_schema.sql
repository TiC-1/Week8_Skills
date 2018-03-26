BEGIN;

DROP TABLE IF EXISTS rates, currencies;

CREATE TABLE currencies (
  id int NOT NULL,
  name varchar(255) NOT NULL,
  code varchar(255) NOT NULL
);

CREATE TABLE rates (
  fromcurrency_id int NOT NULL,
  tocurrency_id int NOT NULL,
  rate float NOT NULL,
  timestamp timestamp NOT NULL
);

COMMIT;
