import express,{type Request, type Response, type NextFunction} from "express";
import Employee from "../models/employee.ts";
import Patient from "../models/patient.ts";
import { unknown } from "zod";

const testingRouter=express.Router()

testingRouter.post("/reset",async(_req: Request,res:Response)=>{
    try{
        await Employee.deleteMany({})
        await Patient.deleteMany({})
        console.log("testing db cleared")
        res.status(204).end()
    }catch(error){
        console.log("Testing db reset error")
        res.status(500).json({ error: error.message });
    }
})

export default testingRouter