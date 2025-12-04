CREATE DATABASE jest;

USE jest;

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100)
);

-- some dummy users
INSERT INTO users VALUES
    -- (1,'admin','admin@gmail.com','Admin@2025'),
    (2,'user1','user1@gmail.com','User1@2025'),
    (3,'user2','user2@gmail.com','User2@2025')
;
