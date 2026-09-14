import Patient from "../models/patient.ts";

import type { NewEntryType, NonSensitivePatient ,PatientType,NewPatientType ,EntryType, updatePatientSchema, updatePatientType} from "../zodSchemas.ts";




//can take all the data, should not export to any file!!
/*const getData=():Patients[]=>{
    return patients;
}*/

const getNonSensitiveData=async():Promise<NonSensitivePatient[]> =>{
    const AllData= await Patient.find({}).select({name:1,gender:1,dateOfBirth:1,occupation:1});
    return AllData;
};

const getOne=async (id:string):Promise<PatientType>=>{
    const patient= await Patient.findById(id);
    if (patient===null){
        throw new Error(`can't find user ${id}`);
    }
    return patient;
};

const addData=async(data:NewPatientType):Promise<PatientType>=>{
    const newPatient= new Patient(data);
    const savedPatient = await newPatient.save();
    return savedPatient;
};

const addEntry=async(id:string,data:NewEntryType):Promise<EntryType>=>{
    const patient= await Patient.findById(id);
    if(!patient){
        throw new Error (`can't find user${id}`);
    }
    if (!patient.entries) {
  patient.entries = [];
}
    patient.entries.push(data);
    await patient.save();
    const savedEntry =patient.entries.at(-1);

    return  savedEntry as EntryType;  
};

const updatePatient=async(id:string,data:updatePatientType)=>{
    const patient= await Patient.findById(id)
    if(!patient){
        throw new Error (`can't find user${id}`)
    }

    if (Object.keys(data).length===0){
        throw new Error("Everything up-to-date");
    }

    const updatedPatient= await Patient.findByIdAndUpdate(id,{$set:data},{returnDocument: 'after',runValidators:true});
        return updatedPatient; 
}


const deletePatient=async (patientId:string):Promise<void>=>{
    const patient= await Patient.findByIdAndDelete(patientId);
    if(!patient){
        throw new Error (`can't find user${patientId}`);}
    return;  
}

export default{
    addData,getNonSensitiveData,getOne,addEntry, deletePatient,updatePatient
};