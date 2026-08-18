import express,{type Request, type Response, type NextFunction} from "express";
import admin_employee from "../services/admin_employee.ts";
import { NewEmployeeSchema, updateEmployeeSchema ,updatePasswordSchema } from "../zodSchemas.ts";
import type { NewEmployeeType,updateEmployeeType,updatePasswordType } from "../zodSchemas.ts";
import { parser } from "../utils/validator.ts";

const employeeRouter=express.Router();

employeeRouter.get("/",async(req: Request,res:Response,next: NextFunction)=>{
    try{
        const employee=req.employee
        if(!employee){
            throw new Error ("please login")
        }
        else if (employee.role!=="admin" && employee.role!=="master"){
            throw new Error ("Insufficient Permissions")
        }
    const employees =await admin_employee.getAllEmployee();
    res.json(employees);}catch(error){
        next(error);
    }
});

employeeRouter.get("/:id",async(req: Request,res:Response,next: NextFunction)=>{
    try{
    const id= req.params.id;
    const loginEmployee=req.employee
    if(!loginEmployee){
            throw new Error ("please login")
        }
        else if (loginEmployee.role!=="admin" && loginEmployee.role!=="master" &&loginEmployee.id!==id){
            throw new Error ("Insufficient Permissions")
        }

    const employee =await admin_employee.getOneEmployee(id as string);
    res.json(employee);}catch(error){
        next(error);
    }
});

employeeRouter.post("/",parser(NewEmployeeSchema),async(req:Request,res:Response,next: NextFunction)=>{
    try{
        const employee=req.employee
        if(!employee){
            throw new Error ("please login")
        }
        else if (employee.role!=="admin" && employee.role!=="master"){
            throw new Error ("Insufficient Permissions")
        }
    
    const newEmployee= await admin_employee.addEmployee(req.body as NewEmployeeType);
    res.json(newEmployee);
    }catch(error){
        next(error);
    }
});


employeeRouter.patch("/:id/password",parser(updatePasswordSchema),async (req:Request,res:Response, next: NextFunction)=>{
    try{
           const id=req.params.id;
        const loginEmployee=req.employee
    if(!loginEmployee){
            throw new Error ("please login")
        }
        else if (loginEmployee.id!==id){
            throw new Error ("Insufficient Permissions")
        }
       
 
    await admin_employee.updatePassword(id as string,req.body as updatePasswordType);

    res.json({message:"password updated"});}catch(error){
        next(error);
    }
});

employeeRouter.patch("/:id/details",parser(updateEmployeeSchema),async (req:Request,res:Response, next: NextFunction)=>{
    try{
        const id=req.params.id;
        const loginEmployee=req.employee
    if(!loginEmployee){
            throw new Error ("please login")
        }
        else if (loginEmployee.role!=="admin" && loginEmployee.role!=="master" &&loginEmployee.id!==id){
            throw new Error ("Insufficient Permissions")
        }
       
        const updatedEmployee=await admin_employee.updateDetails(id as string,req.body as updateEmployeeType);
        res.json(updatedEmployee);
    }catch(error){
        next(error);
    }
});

employeeRouter.delete("/:id",async (req:Request,res:Response, next: NextFunction)=>{
    try{
        const id=req.params.id;
          const loginEmployee=req.employee
    if(!loginEmployee){
            throw new Error ("please login")
        }
        else if (loginEmployee.role!=="admin" && loginEmployee.role!=="master"){
            throw new Error ("Insufficient Permissions")
        }
       
        await admin_employee.removeEmployee(id as string);
        res.json({message:`employee ${id} deleted`});
    }catch(error){next(error);}
});

export default employeeRouter;