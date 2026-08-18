import  type {DiagnosisType} from "../zodSchemas.ts";
import Diagnosis from "../models/dignosis.ts";


const getData=async():Promise<DiagnosisType[]>=>{
    const allDiagnoses =await Diagnosis.find({});
    return allDiagnoses;
};

const createDiagnoses= async(diagnosis:DiagnosisType):Promise<DiagnosisType>=>{
    const code = diagnosis.code
    if (!code){
       throw new Error("please provide valid code")
    }
    const checkCode= await Diagnosis.findOne({code:code})
    if (checkCode){
        throw new Error("Code existed")
    }
    const newDiagnosis= new Diagnosis(diagnosis)
    const savedDiagnosis = await newDiagnosis.save()

    return savedDiagnosis
}

export default{
    getData,createDiagnoses
};