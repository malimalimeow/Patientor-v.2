import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Employee from "../models/employee.ts";


const toLogin = async (username:string,password:string):Promise<{ token: string; name: string }>=>{
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

  return { token, name: employee.name };
};

export default{toLogin};


