BEGIN;

INSERT INTO currencies (id, name, code) VALUES
(1, 'US Dollar', 'USD'),
(2, 'Euro', 'EUR'),
(3, 'Bitcoin', 'BTC'),
(4, 'Ethereum', 'ETH');

INSERT INTO rates (fromcurrency_id, tocurrency_id, rate, timestamp) VALUES
(1, 2, 1.2, current_timestamp),
(1, 3, 1.2, current_timestamp),
(1, 4, 1.2, current_timestamp),
(2, 1, 1.5, current_timestamp),
(2, 3, 1.5, current_timestamp),
(2, 4, 1.5, current_timestamp),
(3, 1, 1.5, current_timestamp),
(3, 2, 1.2, current_timestamp),
(3, 4, 1.2, current_timestamp),
(4, 1, 0.7, current_timestamp),
(4, 2, 0.7, current_timestamp),
(4, 3, 0.7, current_timestamp);

COMMIT;
