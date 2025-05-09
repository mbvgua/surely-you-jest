# surely-you-jest

## Project Overview

testing a simple API with jest

## Project Setup

### Database setup

To get the database setup, assumming you are using a *nix based OS:

1. Move to the `db-schema` directory by:

```bash
    $ cd db-schema
```

1. Then create the entire schema from the command line by:

```bash
    $ mysql <db.sql> output.tab -u root -p
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
    mysql> SELECT * FROM jest;
```


### Backend setup

To get the backend setup, assumming you are using a *nix based OS and already in the root directory within the project:

1. Simply start the server with npm:

```bash
    $ npm start
```

To make various requests and see responses in the application, you could either use the `app.http` file if you have the [Vs-code Restclient](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) installed or use [Postman](https://www.postman.com/) if you don't.

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
    $ npm test
```

## Project Resources

Some helpful resources that guided my thinking were;

- [zellwk](https://zellwk.com/blog/endpoint-testing/)
- [antstack](https://www.antstack.com/blog/mastering-database-testing-with-jest-and-super-test-a-hands-on-approach-for-postgre-sql/)
- [free-code-camp](https://www.freecodecamp.org/news/end-point-testing/)
- [bogs tech](https://bognov.tech/mern-stack-test-nodejs-and-express-with-jest#heading-refactoring-get-calls)
- [ermias on medium](https://medium.com/@it.ermias.asmare/node-js-express-with-jest-and-supertest-e58aaf4c4514)
- [ali](https://allahisrabb.hashnode.dev/mastering-jest-for-expressjs-api-testing)

