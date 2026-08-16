import patientService from "../services/patientService.ts";
import express,{type Request, type Response, type NextFunction} from "express";
import { NewEntrySchema, NewPatientSchema,PatientSchema } from "../zodSchemas.ts";
import type{EntryType, NewEntryType, NewPatientType ,PatientType} from "../zodSchemas.ts";
import { parser } from "../utils/validator.ts";



const patientRouter=express.Router();

patientRouter.get("/",async(_req:Request,res:Response,next: NextFunction)=>{
  try{  
  const patients =  await patientService.getNonSensitiveData();
    res.json(patients);}catch(error){
      next(error);
    }
});

patientRouter.get("/:id", async(req:Request,res:Response,next: NextFunction)=>{
  try{
    const id = req.params.id;
  const patient= await patientService.getOne(id as string);
  const parsedPatient= PatientSchema.parse(patient);
  console.log("Get",patient);
  res.json(parsedPatient);
  }catch(error:unknown){
    next(error);
  }

});

patientRouter.post("/", parser(NewPatientSchema),async (req:Request<unknown,unknown,NewPatientType>,res:Response<PatientType>,next:NextFunction)=>{
    try{const response = await  patientService.addData(req.body);
    console.log("add someone,response:",response,"body:",req.body);
    res.json(response);}catch(error){
      next(error);
    }
});

patientRouter.post("/:id/entries", parser(NewEntrySchema), async(req:Request<{ id: string },unknown,NewEntryType>,res:Response<EntryType >,next:NextFunction)=>{
    try{const response = await patientService.addEntry(req.params.id,req.body);
    res.json(response);}catch(error){
      next(error);
    }
});

export default patientRouter;