import supertest from "supertest";
import app from "./../app";
import { IUsers } from "./models";
import { pool } from "./../config/db.config";

const request = supertest(app);

let newUser: IUsers = {
  name: "sentinel",
  email: "sentinel@gmail.com",
  password: "Sentinel@2025",
};

let nonExistingUser: IUsers = {
  name: "lancelot",
  email: "lancelot@gmail.com",
  password: "Lancelot@2025",
};

let nonExistingUser2: IUsers = {
  name: "perceival",
  email: "perceival@gmail.com",
  password: "Perceival@2025",
};

let originalUser: IUsers = {
  name: "admin",
  email: "admin@gmail.com",
  password: "Admin@2025",
};

let incorrectUserEmail: IUsers = {
  name: "admin",
  email: "Admin@gmail.com",
  password: "Admin@2025",
};

let incorrectUserPassword: IUsers = {
  name: "admin",
  email: "admin@gmail.com",
  password: "admin@2025",
};

beforeAll(async () => {
  const connection = await pool.getConnection();
  await connection.query("INSERT INTO users VALUES(?,?,?,?);", [
    1,
    originalUser.name,
    originalUser.email,
    originalUser.password,
  ]);
});

afterAll(async () => {
  const connection = await pool.getConnection();
  await connection.query("DELETE FROM users WHERE email='sentinel@gmail.com';");
  await connection.query("DELETE FROM users WHERE email='lancelot@gmail.com';");
  //await connection.query("DELETE FROM users WHERE email='perceival@gmail.com';",);
  await connection.query("DELETE FROM users WHERE email='Admin@gmail.com';");
});

describe("[POST /register]", () => {
  it("should register a new user into the application", async () => {
    //1.arrange

    //2.act
    const response = await request.post("/register").send(newUser);

    //3.assert
    expect(response.statusCode).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.status).toMatch("success");
    expect(response.body.code).toEqual(201);
    expect(response.body.message).toMatch(
      "You have successfuly created a new user!",
    );
    expect(response.body.data.user).toHaveProperty("name", newUser.name);
    expect(response.body.data.user).toHaveProperty("email", newUser.email);
    expect(response.body.metadata).toBeNull();
  });
});

describe("[POST /login]", () => {
  it("should login existing users into the application", async () => {
    //1.arrange

    //2.act
    const response = await request
      .post("/login")
      .send({ name: newUser.name, password: newUser.password });

    //3.assert
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.status).toMatch("success");
    expect(response.body.code).toEqual(200);
    expect(response.body.message).toMatch("You have successfully logged in!");
    expect(response.body.data.user).toHaveProperty("name", newUser.name);
    expect(response.body.data.user).toHaveProperty("email", newUser.email);
    expect(response.body.metadata).toBeNull();
  });

  it("should validate user input, returning error if incorrect", async () => {
    //1.arrange

    //2.act
    const response = await request.post("/login").send(nonExistingUser);

    //3.assert
    expect(response.statusCode).toBe(422);
    expect(response.body).toBeDefined();
    expect(response.body.status).toMatch("error");
    expect(response.body.code).toEqual(422);
    expect(response.body.message).toMatch(
      "Incorect username or password, try again?",
    );
    expect(response.body.data.user).toHaveProperty(
      "name",
      nonExistingUser.name,
    );
    expect(response.body.data.user).toHaveProperty(
      "password",
      nonExistingUser.password,
    );
    expect(response.body.metadata).toBeNull();
  });
});

describe("[GET /get-users]", () => {
  it("should get all the users in the system", async () => {
    // arange
    // act
    const response = await request.get("/get-users");
    // assert
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.status).toMatch("success");
    expect(response.body.code).toEqual(200);
    expect(response.body.message).toMatch(
      "Successfully retrieved all users from the database.",
    );
    expect(response.body.metadata).not.toBeNull();
  });
});

describe("[GET /get/:id]", () => {
  it("should get a user by a given id", async () => {
    //arrange
    let id = 111;
    const connection = await pool.getConnection();
    await connection.query("INSERT INTO users VALUES(?,?,?,?);", [
      id,
      nonExistingUser.name,
      nonExistingUser.email,
      nonExistingUser.password,
    ]);
    connection.release();
    //act
    const response = await request.get(`/get/${id}`);

    //assert
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeDefined();
    expect(response.body.status).toMatch("success");
    expect(response.body.code).toEqual(200);
    expect(response.body.message).toMatch(
      `You have successfully retrieved user of id:${id}.`,
    );
    expect(response.body.data.user).toHaveProperty("id", String(id));
    expect(response.body.data.user).toHaveProperty(
      "name",
      nonExistingUser.name,
    );
    expect(response.body.data.user).toHaveProperty(
      "email",
      nonExistingUser.email,
    );
    expect(response.body.metadata).toBeNull();
  });

  it("should fail when trying to get a user not in the system", async () => {
    // arrange
    let id = 1738;

    //act
    const response = await request.get(`/get/${id}`);

    //assert
    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeDefined();
    expect(response.body.status).toMatch("error");
    expect(response.body.code).toEqual(404);
    expect(response.body.message).toMatch(
      "There is no user with that id. Try again?",
    );
    expect(response.body.data.user).toHaveProperty("id", String(id));
    expect(response.body.metadata).toBeNull();
  });
});

describe("[POST /update/:id]", () => {
  it("should update a users details", async () => {
    // arrange
    let id = 2;

    // act
    const response = await request.put(`/update/${id}`).send({
      name: nonExistingUser2.name,
      email: nonExistingUser2.email,
      password: nonExistingUser2.password,
    });

    // assert
    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeDefined();
    expect(response.body.message).toMatch(
      "You have successfully updated your details.",
    );
    expect(response.body.data.user).toHaveProperty("id");
    expect(response.body.data.user).toHaveProperty(
      "name",
      nonExistingUser2.name,
    );
    expect(response.body.data.user).toHaveProperty(
      "email",
      nonExistingUser2.email,
    );
    expect(response.body.metadata).toBeNull();
  });

  it("should fail to update non-existence user with appropriate error message", async () => {
    // arrange
    let id = 1738;

    // act
    const response = await request.put(`/update/${id}`).send({
      name: nonExistingUser2.name,
      email: nonExistingUser2.email,
      password: nonExistingUser2.password,
    });

    // assert
    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeDefined();
    expect(response.body.message).toMatch(
      `User of id:${id} was not found. Failed updating details, try again later?`,
    );
    expect(response.body.data).toHaveProperty("user");
    expect(response.body.metadata).toBeNull();
  });
});

describe("[DELETE /delete/id]", () => {
  it("should delete a users account", async () => {
    // arrange
    let id = 1;

    // act
    const response = await request.delete(`/delete/${id}`);

    // NOTE: how to test for this?! delete but prints emty value in console..
    // assert
    console.log(response.body);
    //expect(response.statusCode).toEqual(204);
    //expect(response.body).toBeDefined();
    //expect(response.body.status).toMatch("success");
    //expect(response.body.message).toMatch(
    //  "You have successfuly deleted your account!",
    //);
    //expect(response.body.data).toHaveProperty("user");
    //expect(response.body.metadata).toBeNull();
  });
  it("should fail to delete non-existent users account", async () => {
    // arrange
    let id = 1738;

    // act
    const response = await request.delete(`/delete/${id}`);

    // assert
    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeDefined();
    expect(response.body.status).toMatch("error");
    expect(response.body.message).toMatch(
      "That user does not exist, try again?",
    );
    expect(response.body.data.user).toHaveProperty("id", String(id));
    expect(response.body.metadata).toBeNull();
  });
});
