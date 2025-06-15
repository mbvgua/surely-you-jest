CREATE DATABASE jest;

USE jest;

CREATE TABLE users(
    id INT AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    PRIMARY KEY (id)
);

-- some dummy users
INSERT INTO users VALUES
    (DEFAULT,'admin','admin@gmail.com','Admin@2025'),
    (DEFAULT,'user1','user1@gmail.com','User1@2025'),
    (DEFAULT,'user2','user2@gmail.com','User2@2025')
;
