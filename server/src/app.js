import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { CORS_ORIGIN } from "./config/environment.js";
import { errorHandler } from "./middlewares/index.js";
import appRouter from "./routes/index.js";

const app = express();

app.use(
  cors({
    origin: [CORS_ORIGIN],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);
app.use(cookieParser());

app.use("/api", appRouter);
app.use(errorHandler); //call this after the routes middleware

export default app;
