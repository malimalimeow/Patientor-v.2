import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Employee from "../models/employee.ts";
import type { Types } from "mongoose";


const toLogin = async (username:string,password:string):Promise<{ token: string,employeeForToken:{name:String,id: Types.ObjectId,role:string}}>=>{
    const employee= await Employee.findOne({username});
    const passwordCorrect = employee ===null? false: await bcrypt.compare(password, employee.passwordHash);
    if(!(employee && passwordCorrect)){
        throw new Error("invalid username or password");
    }

    const employeeForToken ={name:employee.name,id:employee._id, role:employee.role};
    if(!process.env.SECRET){
        throw new Error("SECRET is not found");
      }
    const token = jwt.sign(employeeForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  return { token, employeeForToken };
};

export default{toLogin};


