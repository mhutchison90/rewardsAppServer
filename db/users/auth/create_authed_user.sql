INSERT INTO users 
(firstname, lastname, email, picture, auth_id, pointbalance)
VALUES($1, $2, $3, $4, $5, 0)
RETURNING *; --inserts new user then returns that user