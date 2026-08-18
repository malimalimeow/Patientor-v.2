import express,{type Request, type Response, type NextFunction} from "express";
import loginServices from "../services/loginServices.ts";
import { parser } from "../utils/validator.ts";
import { loginSchema } from "../zodSchemas.ts";
import type {loginType} from "../zodSchemas.ts";

const loginRouter=express.Router();

loginRouter.post("/",parser(loginSchema),async(req:Request,res:Response,next:NextFunction)=>{
    try{
    const { username  , password }=req.body as loginType;
    const {token,name}= await loginServices.toLogin(username,password);

    res.json({message:`Login success,welcome back!${name},token:${token}`}); }catch(error){
        next(error);
    }
});

export default loginRouter;
