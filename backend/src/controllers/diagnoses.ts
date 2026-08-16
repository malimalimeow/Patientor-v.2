import express from"express";
import diagnosesService from "../services/diagnosesService.ts";


const diagnosesRouter = express.Router();

diagnosesRouter.get("/", async (_req,res)=>{
    const data = await diagnosesService.getData();
    res.send(data);
});


export default diagnosesRouter;