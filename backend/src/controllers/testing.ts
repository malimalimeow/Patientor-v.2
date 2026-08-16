import express,{type Request, type Response} from "express";
import Employee from "../models/employee.ts";
import Patient from "../models/patient.ts";

const testingRouter=express.Router();

testingRouter.post("/reset",async(_req: Request,res:Response)=>{
    try{
        await Employee.deleteMany({});
        await Patient.deleteMany({});
        console.log("testing db cleared");
        res.status(204).end();
    }catch(error){
        console.log("Testing db reset error");
        if (error instanceof Error){res.status(500).json({ error: error.message });}
        else{res.status(500).json({ error: "something went wrong" });}
    }
});

export default testingRouter;