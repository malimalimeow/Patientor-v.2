import * as logger from "./logger.ts";
import jwt from "jsonwebtoken";
import Employee from "../models/employee.ts";
import {type Request, type Response, type NextFunction} from "express";
import { ZodError } from "zod";

interface CustomJwtPayload {
  id: string;
  name?: string;
  role:string
}

export const tokenExtractor = (request: Request, _response: Response, next: NextFunction) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.replace("Bearer ", "");
    request.token = token;
  } else {
    request.token = null;
  }

  next();
};

export const employeeExtractor = async (request: Request, response: Response, next: NextFunction) => {
  if (!request.token) {throw new Error ("token is missing");}
  try {
      if(!process.env.SECRET){
        throw new Error("SECRET is not found");
      }
      const decodedToken = jwt.verify(request.token, process.env.SECRET) as CustomJwtPayload;

      if (!decodedToken.id) {
        return response.status(401).json({ error: "token invalid" });
      }
  const employee = await Employee.findById(decodedToken.id);
  
  request.employee = employee;

  return request.employee;

    } catch (error) {
      next(error);
    }
  
  next();
};

export const requestLogger = (request: Request, _response: Response, next: NextFunction) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

export  const unknownEndpoint = (_request: Request, response: Response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

export  const errorHandler = (error: Error, _request: Request, response: Response, next: NextFunction) => {
  logger.error(error);

  if(error instanceof ZodError) {
    return response.status(400).json({
      error: "Validation error",
      details: error.issues,
    });
  }

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }
  return next(error);
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  employeeExtractor
};
