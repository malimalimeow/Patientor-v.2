import type {z} from "zod";
import {type Request, type Response, type NextFunction} from "express";

export const parser = (schema:z.ZodSchema)=>{
  return (req: Request,_res:Response,next: NextFunction)=>{
  try{schema.parse(req.body);
    next();
  }catch (error:unknown){
    next(error);
  }
};};