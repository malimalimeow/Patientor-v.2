import  type {DiagnosisType} from "../zodSchemas.ts";
import Diagnosis from "../models/dignosis.ts";


const getData=async():Promise<DiagnosisType[]>=>{
    const allDiagnoses =await Diagnosis.find({});
    return allDiagnoses;
};

export default{
    getData
};