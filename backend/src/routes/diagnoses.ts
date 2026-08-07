import express from"express";
import diagnosesService from "../services/diagnosesService.ts";


const diagnosesRouter = express.Router();

diagnosesRouter.get("/",(_req,res)=>{
    const data = diagnosesService.getData();
    res.send(data);
});

diagnosesRouter.post("/",(_req,res)=>{
    diagnosesService.addData();
    res.send("add a new diary");
});

export default diagnosesRouter;