import express,{type Request, type Response, type NextFunction} from "express";
import admin_employee from "../services/admin_employee.ts";
import { NewEmployeeSchema, updateEmployeeSchema ,updatePasswordSchema } from "../zodSchemas.ts";
import type { NewEmployeeType,updateEmployeeType,updatePasswordType } from "../zodSchemas.ts";
import { parser } from "../utils/validator.ts";

const employeeRouter=express.Router();

employeeRouter.get("/",async(req: Request,res:Response,next: NextFunction)=>{
    try{
        const loginEmployee=req.employee
       if(!loginEmployee){return res.status(401).json({error:"Insufficient permission,please login "})}
    if (loginEmployee.role!=="admin" && loginEmployee.role!=="master"){
            return res.status(403).json ({error:"Insufficient Permissions"})
        }
    const employees =await admin_employee.getAllEmployee();
    return res.json(employees);}catch(error){
        return next(error);
    }
});



employeeRouter.get("/:id",async(req: Request,res:Response,next: NextFunction)=>{
    try{
    const id= req.params.id;
    const loginEmployee=req.employee
    if(!loginEmployee){return res.status(401).json({error:"Insufficient permission,please login "})}
    if (loginEmployee.role!=="admin" && loginEmployee.role!=="master" &&loginEmployee.id!==id){
            return res.status(403).json ({error:"Insufficient Permissions"})
        } 
    const employee =await admin_employee.getOneEmployee(id as string);
    return res.json(employee);}catch(error){
        return next(error);
    }
});

employeeRouter.post("/",parser(NewEmployeeSchema),async(req:Request,res:Response,next: NextFunction)=>{
    try{
        const loginEmployee=req.employee
       if(!loginEmployee){return res.status(401).json({error:"Insufficient permission,please login "})}
    if (loginEmployee.role!=="admin" && loginEmployee.role!=="master"){
            return res.status(403).json ({error:"Insufficient Permissions"})
        }
    
    const newEmployee= await admin_employee.addEmployee(req.body as NewEmployeeType);
    return res.json(newEmployee);
    }catch(error){
        return next(error);
    }
});


employeeRouter.patch("/:id/password",parser(updatePasswordSchema),async (req:Request,res:Response, next: NextFunction)=>{
    try{
           const id=req.params.id;
        const loginEmployee=req.employee
    if(!loginEmployee){return res.status(401).json({error:"Insufficient permission,please login "})}
    if (loginEmployee.id!==id){
              return res.status(403).json ({error:"Insufficient Permissions"})
        }
       
 
    await admin_employee.updatePassword(id as string,req.body as updatePasswordType);

    return res.json({message:"password updated"});}catch(error){
        return next(error);
    }
});

employeeRouter.patch("/:id/details",parser(updateEmployeeSchema),async (req:Request,res:Response, next: NextFunction)=>{
    try{
        const id=req.params.id;
        const loginEmployee=req.employee
    if(!loginEmployee){return res.status(401).json({error:"Insufficient permission,please login "})}
    if (loginEmployee.role!=="admin" && loginEmployee.role!=="master" &&loginEmployee.id!==id){
            return res.status(403).json ({error:"Insufficient Permissions"})
        } 
    
    const updatedEmployee=await admin_employee.updateDetails(id as string,req.body as updateEmployeeType);
        return res.json(updatedEmployee);
    }catch(error){
        return next(error);
    }
});

employeeRouter.delete("/:id",async (req:Request,res:Response, next: NextFunction)=>{
    try{
        const id=req.params.id;
          const loginEmployee=req.employee
    if(!loginEmployee){return res.status(401).json({error:"Insufficient permission,please login "})}
    if (loginEmployee.role!=="admin" && loginEmployee.role!=="master"){
            return res.status(403).json ({error:"Insufficient Permissions"})
        }
       
        await admin_employee.removeEmployee(id as string);
        return res.json({message:`employee ${id} deleted`});
    }catch(error){return next(error);}
});

export default employeeRouter;