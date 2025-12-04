import mysql from "mysql2/promise";
import dotenvx from "@dotenvx/dotenvx";
import { sqlConfiguration } from "../api/models";

dotenvx.config();

const sqlConfig: sqlConfiguration = {
  //NOTE: the 'host' variable is not passed in the backend.env, instead it will
  // be passed in the docker-compose.yaml .env, allowing the container to connect
  // either on the localhost or from the docker container if need be
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

export const pool = mysql.createPool(sqlConfig);
