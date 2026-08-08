import data from "../../data/diagnoses.ts" with {type:"json"};

import  type {DiagnosisType} from "../zodSchemas.ts";

const diagnoses: DiagnosisType[]= data;

const getData=():DiagnosisType[]=>{
    return diagnoses;
};

export default{
    getData
};