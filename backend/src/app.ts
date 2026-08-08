import express from "express";
import mongoose from "mongoose";
import config from "./utils/config.ts";
import logger from "./utils/logger.ts";
import middleware from "./utils/middleware.ts";
import diagnosesRouter from "./controllers/diagonoses.ts";
import employeeRouter from "./controllers/employees.ts";
import loginRouter from "./controllers/login.ts";
import patientRouter from "./controllers/patients.ts";
const  app = express();

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI as string, { family: 4 })
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error:unknown) => {
    logger.error("error connecting to MongoDB:", { message: (error as Error).message });
  });

//app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);S

app.use("/api/login", loginRouter);
app.use("/api/patients", middleware.userExtractor, patientRouter);
app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/employees", employeeRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
