import data from "../../data/patients.ts" with {type:"json"};

import type { EntryType,NewEntryType,PatientType, NonSensitivePatient, NewPatientType } from "../zodSchemas.ts";
import { v1 as uuid } from 'uuid';

const patients: PatientType[]= data||[];


//can take all the data, should not export to any file!!
/*const getData=():Patients[]=>{
    return patients;
}*/

const getNonSensitiveData=():NonSensitivePatient[] =>{
return patients.map(({id,name,dateOfBirth,gender,occupation})=>(({id,name,dateOfBirth,gender,occupation})
    
));};

const getOne=(id:string):PatientType[]=>{
    const patient=patients.filter((p)=>p.id===id);
    return patient;
};

const addData=(data:NewPatientType):PatientType=>{
    const id = uuid();
    const newPatient:PatientType= {id,...data,entries:data.entries||[]};
    patients.push(newPatient);
    return newPatient;
};

const addEntry=(id:string,data:NewEntryType):EntryType=>{
    const newId:string=uuid();
    const newEntry:EntryType={id:newId,...data};
    const patient=patients.find(p=>p.id===id);
    if(!patient){
        throw new Error (`can't find user${id}`);
    }
    if (!patient.entries) {
  patient.entries = [];
}
    patient.entries.push(newEntry);
    console.log(patient);
    return newEntry;  
};

export default{
    addData,getNonSensitiveData,getOne,addEntry
};