import * as express from "express";
import type {EmployeeType} from "./types/employee";

declare global {
  namespace Express {
    interface Request {
      token?: string | null;
      employee?: EmployeeType | null;
    }
  }
}

//create a token definition in Request