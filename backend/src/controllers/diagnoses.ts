import express from"express";
import diagnosesService from "../services/diagnosesService.ts";
import type { DiagnosisType } from "../zodSchemas.ts";


const diagnosesRouter = express.Router();

diagnosesRouter.get("/", async (_req,res)=>{
    const data = await diagnosesService.getData();
    res.json(data);
});

diagnosesRouter.post("/",async(req,res)=>{
    const response = await diagnosesService.createDiagnoses(req.body as DiagnosisType);
    res.json(response);
});


export default diagnosesRouter;