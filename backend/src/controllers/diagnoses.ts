import express from"express";
import diagnosesService from "../services/diagnosesService.ts";


const diagnosesRouter = express.Router();

diagnosesRouter.get("/",(_req,res)=>{
    const data = diagnosesService.getData();
    res.send(data);
});


export default diagnosesRouter;