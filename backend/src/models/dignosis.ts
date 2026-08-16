import mongoose, { Schema } from "mongoose";
import type { DiagnosisType } from "../zodSchemas.ts";

const MongoDiagnosisSchema= new Schema <DiagnosisType>({
    code: {type:String,required:true},
        name: {type:String,required:true},
        latin: {type:String},
},{_id:false});

const Diagnosis= mongoose.model("Diagnosis",MongoDiagnosisSchema);

export default Diagnosis;

