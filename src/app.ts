import express, { json } from "express";
import router from "./api/routes";

const app = express();

// add application middleware
app.use(json());
app.use(router);

export default app;
