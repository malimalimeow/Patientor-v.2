import patientService from "../services/patientService.ts";
import express,{type Request, type Response, type NextFunction} from "express";
import { NewEntrySchema, NewPatientSchema,PatientSchema } from "../zodSchemas.ts";
import type{EntryType, NewEntryType, NewPatientType ,PatientType, updatePatientType} from "../zodSchemas.ts";
import { parser } from "../utils/validator.ts";



const patientRouter=express.Router();

patientRouter.get("/",async(req:Request,res:Response,next: NextFunction)=>{
  try{  
    const employee=req.employee
        if(!employee){
            return res.status(401).json({error:"Insufficient permission,please login "})
        }
  const patients =  await patientService.getNonSensitiveData();
    return res.json(patients);}catch(error){
      return next(error);
    }
});

patientRouter.get("/:id", async(req:Request,res:Response,next: NextFunction)=>{
  try{
    const employee=req.employee
        if(!employee){
            return res.status(401).json({error:"Insufficient permission,please login "})
        }
    const id = req.params.id;
  const patient= await patientService.getOne(id as string);
  if(!patient){return res.status(404).json({error:"patient not found"})}

  const parsedPatient= PatientSchema.parse(patient);
  
  console.log("Get",patient);
  return res.status(200).json(parsedPatient);
  }catch(error:unknown){
    return next(error);
  }

});

patientRouter.post("/", parser(NewPatientSchema),async (req:Request<unknown,unknown,NewPatientType>,res:Response<PatientType| { error: string }>,next:NextFunction)=>{
    try{
      const employee=req.employee
        if(!employee){
            return res.status(401).json({error:"Insufficient permission,please login "})
        }
      const response = await  patientService.addData(req.body);
    console.log("add someone,response:",response,"body:",req.body);
    return res.json(response);}catch(error){
      return next(error);
    }
});

patientRouter.post("/:id/entries", parser(NewEntrySchema), async(req:Request<{ id: string },unknown,NewEntryType>,res:Response<EntryType | { error: string }>,next:NextFunction)=>{
    try{
      const employee=req.employee
        if(!employee){
            return res.status(401).json({error:"Insufficient permission,please login "})
        }

      const response = await patientService.addEntry(req.params.id,req.body);
       if(response===null){return res.status(404).json({error:"patient not found"})}
    return res.json(response);}catch(error){
      return next(error);
    }
});

patientRouter.patch("/:id",async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const employee=req.employee
        if(!employee){
            return res.status(401).json({error:"Insufficient permission,please login "})
  }
  const id=req.params.id
  const updatedPatient= await patientService.updatePatient(id as string,req.body as updatePatientType)
   if(updatedPatient===null){return res.status(404).json({error:"patient not found"})}
  return res.json(updatedPatient)

}catch(error){return next(error)}})

patientRouter.delete("/:id",async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const employee=req.employee
    if(!employee){return res.status(401).json({error:"Insufficient permission,please login "})}
    
    if (employee.role!=="master"){
            return res.status(403).json ({error:"Insufficient Permissions"})
        }

    const response = await patientService.deletePatient(req.params.id as string)
    

    return res.json(response)
  }catch(error){
    return next(error)
  }
})

export default patientRouter;