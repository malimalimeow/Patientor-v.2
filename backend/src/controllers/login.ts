import express,{type Request, type Response, type NextFunction} from "express";
import loginServices from "../services/loginServices.ts";
import { parser } from "../utils/validator.ts";
import { loginSchema } from "../zodSchemas.ts";
import type {loginType} from "../zodSchemas.ts";

const loginRouter=express.Router();

loginRouter.post("/",parser(loginSchema),async(req:Request,res:Response,next:NextFunction)=>{
    try{
    const { username  , password }=req.body as loginType;
    const response= await loginServices.toLogin(username,password);

    if(response===null){
        return res.status(400).json({ error: "invalid username or password" });
    }

    const {token,employeeForToken}=response

    return res.json({message:`Login success,welcome back!${employeeForToken.name},token:${token}`,
        token,
        name:employeeForToken.name,
        id:employeeForToken.id,
        role:employeeForToken.role}); }catch(error){
        return next(error);
    }
});

export default loginRouter;
