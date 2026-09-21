import express,{type Request, type Response} from "express";
import Employee from "../models/employee.ts";
import Patient from "../models/patient.ts";
import bcrypt from "bcrypt"
import type { EmployeeType, PatientType } from "../zodSchemas.ts";

const testingRouter=express.Router();

const passwordHash = await bcrypt.hash("Password123!",10)

const master:EmployeeType = {
    id:"9239231203",
           name: "Master Admin",
      username: "M1a2b3c", 
      passwordHash,
      title: "System Master Administrator",
      dateOfBirth: "1990-01-01",
      NI: "MA111111A",
      address: "Headquarters 1, London",
      emergencyContact: "91111111",
      gender: "other",
      role: "master" 
        }

const testPatient:PatientType = {
    id:"9126027012921",
        name: 'Test Patient',
        dateOfBirth: '1991-02-03',
        gender: 'female',
        occupation: 'one Job',
        entries: []
      };


testingRouter.post("/reset",async(_req: Request,res:Response)=>{
    try{
        await Employee.deleteMany({});
        await Patient.deleteMany({});
        await Employee.findOneAndUpdate(
    { username: master.username },
  master,
  { upsert: true, returnDocument: 'after', runValidators: true }
);

await Patient.findOneAndUpdate({name:testPatient.name},testPatient,{upsert:true,returnDocument: 'after',runValidators:true});

        return res.status(204).end();
        
    }catch(error){
        console.log("Testing db reset error",error);
        if (error instanceof Error){return res.status(500).json({ error: error.message });}
        else{return res.status(500).json({ error: "something went wrong" });}
    }
});

export default testingRouter;