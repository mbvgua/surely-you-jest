import { Request, Response, Router } from "express";
import { pool } from "../config/db.config";
import { IUsers } from "./models";

const router = Router();

// registerUser
router.post("/register", async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;
    const registerUser = await pool.query(
      "INSERT INTO users(name,email,password) VALUES(?,?,?);",
      [name, email, password],
    );

    return response.status(201).json({
      status: "success",
      code: 201,
      message: "You have successfuly created a new user!",
      data: {
        user: {
          name: name,
          email: email,
        },
      },
      metadata: null,
    });
  } catch (error) {
    return response.status(500).json({
      status: "error",
      code: 500,
      message: "An internal server error occurred",
      data: error,
      metadata: null,
    });
  }
});

// loginUser
router.post("/login", async (request: Request, response: Response) => {
  try {
    const { name, password } = request.body;
    const [loginUser] = await pool.query(
      "SELECT * FROM users WHERE name=? AND password=?;",
      [name, password],
    );
    const user = loginUser as Array<IUsers>;
    if (user && user.length > 0) {
      return response.status(201).json({
        status: "success",
        code: 201,
        message: "You have successfully logged in!",
        data: {
          user: {
            id: user[0].id,
            name: name,
            email: user[0].email,
          },
        },
        metadata: null,
      });
    }
    return response.status(422).json({
      status: "error",
      code: 422,
      message: "Incorect username or password, try again?",
      data: {
        user: {
          name: name,
          password: password,
        },
      },
      metadata: null,
    });
  } catch (error) {
    return response.status(500).json({
      status: "error",
      code: 500,
      message: "An internal server error occurred",
      data: { error },
      metadata: null,
    });
  }
});

// getUsers
router.get("/get-users", async (request: Request, response: Response) => {
  try {
    const [getUsers] = await pool.query("SELECT * FROM users;");
    const users = getUsers as Array<IUsers>;
    if (users && users.length > 0) {
      return response.status(200).json({
        status: "success",
        code: 200,
        message: "Successfully retrieved all users from the database.",
        data: {
          users: users,
        },
        metadata: {
          totalUsers: users.length,
        },
      });
    }
    return response.status(404).json({
      status: "error",
      code: 404,
      message: "There are currently no users in the database! Try again later?",
      data: {
        users: {},
      },
      metadata: null,
    });
  } catch (error) {
    return response.status(500).json({
      status: "error",
      code: 500,
      message: "An internal server error occurred",
      data: error,
      metadata: null,
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
        "SELECT * FROM users WHERE id=?;",
        [id],
      );
      const user = getUserById as Array<IUsers>;
      if (user && user.length > 0) {
        return response.status(200).json({
          status: "success",
          code: 200,
          message: `You have successfully retrieved user of id:${id} from the database`,
          data: {
            user: {
              id: id,
              name: user[0].name,
              email: user[0].email,
            },
          },
          metadata: null,
        });
      }
      return response.status(404).json({
        status: "error",
        code: 404,
        message: "There is no user with that id. Try again?",
        data: {
          user: {
            id: id,
          },
        },
        metadata: null,
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        code: 500,
        message: "An internal server error occurred",
        data: error,
        metadata: null,
      });
    }
  },
);

// updateUser
router.put(
  "/update/:id",
  async (request: Request<{ id: string }>, response: Response) => {
    try {
      const id = request.params.id;
      const { name, email, password } = request.body;
      const [updateUser] = await pool.query("SELECT * FROM users WHERE id=?;", [
        id,
      ]);
      const user = updateUser as Array<IUsers>;

      if (user.length > 0) {
        await pool.query(
          "UPDATE users SET name=?,email=?,password=? WHERE id=?;",
          [name, email, password, id],
        );
        return response.status(201).json({
          status: "success",
          code: 201,
          message: "You have successfully updated your details.",
          data: {
            user: {
              id: id,
              name: name,
              email: email,
            },
          },
          metadata: null,
        });
      }
      return response.status(404).json({
        status: "error",
        code: 404,
        message: `User of id:${id} was not found. Failed updating details, try again later?`,
        data: {
          user: {
            id: id,
            name: name,
            email: email,
          },
        },
        metadata: null,
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        code: 500,
        message: "An internal server error occurred",
        data: error,
        metadata: null,
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
      const [deleteUser] = await pool.query(`SELECT * FROM users WHERE id=?;`, [
        id,
      ]);
      const user = deleteUser as Array<IUsers>;
      if (user.length > 0) {
        await pool.query("DELETE FROM users WHERE id=?;", [user[0].id]);
        return response.status(204).json({
          status: "error",
          code: 204,
          message: "You have successfuly deleted your account!",
          data: {
            user: {},
          },
          metadata: null,
        });
      }
      return response.status(404).json({
        status: "error",
        code: 404,
        message: "That user does not exist, try again?",
        data: {
          user: {
            id: id,
          },
        },
        metadata: null,
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        code: 500,
        message: "An internal server error occurred",
        data: error,
        metadata: null,
      });
    }
  },
);

export default router;
