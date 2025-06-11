import { Request, Response } from "express";
import { Router } from "express";
import { pool } from "./db";
import { Users } from "./models";

const router = Router();

// registerUser
router.post("/register", async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;
    const registerUser = await pool.query(
      `INSERT INTO users VALUES(
            DEFAULT,
            '${name}',
            '${email}',
            '${password}'
            );`,
    );

    return response.status(200).json({
      status: "success",
      code: 200,
      message: "You have successfuly created a new user!",
      data: {
        user: {
          name: `${name}`,
          email: `${email}`,
          password: `${password}`,
        },
      },
      metadata: {},
    });
  } catch (error) {
    return response.status(500).json({
      status: "error",
      code: 500,
      message:
        "An internal server error occurred while processing the request.",
      data: error,
      metadata: {},
    });
  }
});

// loginUser
router.post("/login", async (request: Request, response: Response) => {
  try {
    const { name, password } = request.body;
    const [loginUser] = await pool.query(
      `SELECT * FROM users WHERE
             name='${name}' AND password='${password}';`,
    );
    const user = loginUser as Array<Users>;
    if (user && user.length > 0) {
      return response.status(200).json({
        status: "success",
        code: 200,
        message: "You have successfuly logged in!",
        data: {
          user: {
            name: `${name}`,
            password: `${password}`,
          },
        },
        metadata: {},
      });
    }
    return response.status(400).json({
      status: "error",
      code: 400,
      message: "Incorect username or password, try again?",
      data: {
        user: {
          name: `${name}`,
          password: `${password}`,
        },
      },
      metadata: {},
    });
  } catch (error) {
    return response.status(500).json({
      status: "error",
      code: 500,
      message:
        "An internal server error has occurred while processing your request",
      data: error,
      metadata: {},
    });
  }
});

// getUsers
router.get("/get-users", async (request: Request, response: Response) => {
  try {
    const [getUsers] = await pool.query(`SELECT * FROM users;`);
    const users = getUsers as Array<Users>;
    if (users && users.length > 0) {
      return response.status(200).json({
        status: "success",
        code: 200,
        message: "Successfully retrieved all users from the database.",
        data: {
          users: users,
        },
        metadata: {},
      });
    }
    return response.status(404).json({
      status: "error",
      code: 404,
      message: "There are currently no users in the database! Try again later?",
      data: {
        users: {},
      },
      metadata: {},
    });
  } catch (error) {
    return response.status(500).json({
      status: "error",
      code: 500,
      message:
        "An internal server error occurred while processing your request.",
      data: error,
      metadata: {},
    });
  }
});

// getUserById
router.get(
  "/get/:id",
  async (request: Request<{ id: string }>, response: Response) => {
    const id = request.params.id;
    try {
      const [getUserById] = await pool.query(
        `SELECT * FROM users WHERE id=${id};`,
      );
      const user = getUserById as Array<Users>;
      if (user && user.length > 0) {
        return response.status(200).json({
          status: "success",
          code: 200,
          message: `You have successfully retrieved user of id:${id} from the database`,
          data: {
            user: {
              id: `${id}`,
              name: `${user[0].name}`,
              email: `${user[0].email}`,
              password: `${user[0].password}`,
            },
          },
          metadata: {},
        });
      }
      return response.status(404).json({
        status: "error",
        code: 404,
        message: "There is no user with that id. Try again?",
        data: {
          user: {},
        },
        metadata: {},
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        code: 500,
        message:
          "An internal server error occured while processing your request",
        data: error,
        metadata: {},
      });
    }
  },
);

// updateUser
router.patch(
  "/update/:id",
  async (request: Request<{ id: string }>, response: Response) => {
    try {
      const id = request.params.id;
      const { name, email, password } = request.body;
      const [updateUser] = await pool.query(
        `SELECT * FROM users WHERE id='${id}';`,
      );
      const user = updateUser as Array<Users>;

      if (user.length > 0) {
        await pool.query(
          `UPDATE users SET 
                name='${name}',
                email='${email}',
                password='${password}' 
                WHERE id='${id}'
                ;`,
        );
        return response.status(200).json({
          status: "success",
          code: 200,
          message: "You have successfully updated your details.",
          data: {
            user: {
              id: `${id}`,
              name: `${name}`,
              email: `${email}`,
              password: `${password}`,
            },
          },
          metadata: {},
        });
      }
      return response.status(404).json({
        status: "error",
        code: 404,
        message: `User of id:${id} was not found. Failed updating details, try again later?`,
        data: {
          user: {
            id: `${id}`,
            name: `${name}`,
            email: `${email}`,
            password: `${password}`,
          },
        },
        metadata: {},
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        code: 500,
        message:
          "An internal server error occurred while processing your request",
        data: error,
        metadata: {},
      });
    }
  },
);

// deleteUser
router.delete(
  "/delete/:id",
  async (request: Request<{ id: string }>, response: Response) => {
    try {
      const id = request.params.id;
      const [deleteUser] = await pool.query(
        `SELECT * FROM users WHERE id=${id};`,
      );
      const user = deleteUser as Array<Users>;
      if (user.length > 0) {
        await pool.query(`DELETE FROM users WHERE id=${user[0].id};`);
        return response.status(200).json({
          status: "error",
          code: 200,
          message: "You have successfuly deleted your account!",
          data: {
            user: {
              id: `${id}`,
              name: `${user[0].name}`,
              email: `${user[0].email}`,
              password: `${user[0].password}`,
            },
          },
          metadata: {},
        });
      }
      return response.status(404).json({
        status: "error",
        code: 404,
        message: "That user does not exist, try again?",
        data: {
          user: {
            id: `${id}`,
            name: `${user[0].name}`,
            email: `${user[0].email}`,
            password: `${user[0].password}`,
          },
        },
        metadata: {},
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        code: 500,
        message:
          "An internal server error occurred while processing your request",
        data: error,
        metadata: {},
      });
    }
  },
);

// 404 routes
router.get("*", async (request: Request, response: Response) => {
  response.status(404).json({
    status: "error",
    code: 404,
    message: "Oops! That route does not exist. Try something different?",
    data: {},
    metadata: {},
  });
});

export default router;
