# surely-you-jest

testing a simple CRUD app with jest

## Local Project Setup

### Database setup

To get the database setup, assumming you are using a *nix based OS:

1. Move to the `database` directory by:

```bash
    $ cd database
```

1. Then create the entire schema from the command line by:

```bash
    $ mysql -u root -p < db.sql > output.tab
```

On keying this in, you will be prompted for your MySql password, and if correct, the database will be created and setup. 

1. To confirm this, you could login to mysql and check it out by:

```bash
    $ mysql -u root -p
    Enter password: 
```

If successful:

```bash
    mysql>
    mysql> SHOW DATABASES;
    mysql> USE jest;
    mysql> SELECT * FROM users;
```

### Backend setup

To get the backend setup, assumming you are using a *nix based OS and already in the root directory within the project:

1. Simply start the server with npm:

```bash
    $ pnpm build
    $ pnpm start
```

To make various requests and see responses in the application, you could either use the `app.http` file and a rest client of choice.

There are 5 main routes in the applicaion:

- `/register` -> registers new users
- `/login` -> login existing users
- `/get-users` -> gets all users in the database
- `/get/:id` -> gets a users using their id
- `/update/:id` -> updates a users data
- `/delete/:id` -> delete a user from the database

### Testing with jest & supertest

To get the setup the testing environment and run the test command:

1. While in the project root directory, start the jest server:

```bash
    $ pnpm test
```

## Project Setup with Docker

To setup the project with docker, simply run the following in the project root directory:

```bash
    $ docker compose up
```

