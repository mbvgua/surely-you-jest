jest.mock("./db", () => ({
  pool: {
    query: jest.fn(), // <== this is the key part
  },
}));
import supertest from "supertest";
import app from "./app";
import { Users } from "./models";
import { pool } from "./db";
import { mock } from "node:test";

//jest.mock("./db", () => ({
//  pool: {
//    query: jest.fn(),
//  },
//}));
const request = supertest(app);
const mockedQuery = pool.query as jest.Mock;

// tearup function
beforeAll(() => {
  mockedQuery.mockReset();
});

describe("[user registration endpoint]", () => {
  it("should register a new user into the application", async () => {
    //1.arrange
    const mockUser: Users = {
      name: "Sentinel",
      email: "sentinel@gmail.com",
      password: "Sentinel@2025",
    };
    mockedQuery.mockResolvedValueOnce([{}, undefined]);

    //2.act
    const registerUser = await request.post("/register").send(mockUser);

    //3.assert
    expect(registerUser.statusCode).toBe(201);
    expect(registerUser.body).toBeDefined();
    expect(registerUser.body).toEqual({
      status: "success",
      code: 201,
      message: "You have successfuly created a new user!",
      data: {
        user: {
          name: `${mockUser.name}`,
          email: `${mockUser.email}`,
          password: `${mockUser.password}`,
        },
      },
      metadata: {},
    });
  });
});

describe("[user login endpoint]", () => {
  it("should login existing users into the application", async () => {
    //1.arrange
    const mockUser: Users = {
      id: "1",
      name: "Sentinel",
      email: "sentinel@gmail.com",
      password: "Sentinel@2025",
    };
    mockedQuery.mockResolvedValueOnce([
      [
        {
          id: 1,
          name: "Sentinel",
          email: "sentinel@gmail.com",
          password: "Sentinel@2025",
        },
      ],
      undefined,
    ]);

    //2.act
    const loginUser = await request.post("/login").send(mockUser);

    //3.assert
    expect(loginUser.statusCode).toBe(201);
    expect(loginUser.body).toBeDefined();
    expect(loginUser.body).toEqual({
      status: "success",
      code: 201,
      message: "You have successfully logged in!",
      data: {
        user: {
          id: `${mockUser.id}`,
          name: `${mockUser.name}`,
          email: `${mockUser.email}`,
          password: `${mockUser.password}`,
        },
      },
      metadata: {},
    });
  });

  it("should validate user input, returning error if incorrect", async () => {
    //1.arrange
    const mockUser: Users = {
      name: "Sentinel",
      password: "Sentinel@2025",
    };
    // this means there will be no user with previously listed values.
    mockedQuery.mockResolvedValueOnce([{}, undefined]);

    //2.act
    const loginUser = await request.post("/login").send(mockUser);

    //3.assert
    expect(loginUser.statusCode).toBe(422);
    expect(loginUser.body).toBeDefined();
    expect(loginUser.body).toEqual({
      status: "error",
      code: 422,
      message: "Incorect username or password, try again?",
      data: {
        user: {
          name: `${mockUser.name}`,
          password: `${mockUser.password}`,
        },
      },
      metadata: {},
    });
  });
});

describe("[get users endpoint]", () => {
  it("should get all the users in the system", async () => {
    //1.arrange

    // this means there will be no user with previously listed values.
    mockedQuery.mockResolvedValueOnce([
      [
        {
          id: 1,
          name: "Sentinel",
          email: "sentinel@gmail.com",
          password: "Sentinel@2025",
        },
        {
          id: 2,
          name: "Lancelot",
          email: "lancelot@gmail.com",
          password: "Lancelot@2025",
        },
      ],
      undefined,
    ]);

    //2.act
    const getUsers = await request.get("/get-users");
    // TODO: get how destructure the mocked array from above. Normally I would have
    // [rows], but this is different
    const mockUsers = [getUsers] as Users[];

    //3.assert
    expect(getUsers.statusCode).toBe(200);
    expect(getUsers.body).toBeDefined();

    // TODO: make this work after above todo. Problem is that it returns a giant
    // request object that doent fit in the .data value
    //expect(getUsers.body).toEqual({
    //  status: "success",
    //  code: 200,
    //  message: "Successfully retrieved all users from the database.",
    //  data: {
    //    users: `${mockUsers}`,
    //  },
    //  metadata: {
    //    totalUsers: `${mockUsers.length}`,
    //  },
    //});
  });

  it("should get a user by a given id", async () => {});

  it("should fail when trying to get a user not in the system", async () => {});

  it("should fail when there are no users in the system", async () => {});
});

describe("[update users endpoint]", () => {
  it("should update a users details", async () => {});
});

describe("[delete user endpoint]", () => {
  it("should delete a users account", async () => {});
});
