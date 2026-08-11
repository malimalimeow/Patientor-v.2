import Patient from "../models/patient.ts"

import type { NewEntryType, NonSensitivePatient ,PatientType,NewPatientType ,EntryType} from "../zodSchemas.ts";




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
        throw new Error(`can't find user ${id}`)
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
    patient.entries.push(data)
    await patient.save()
    const savedEntry =patient.entries.at(-1)

    return  savedEntry as EntryType;  
};

export default{
    addData,getNonSensitiveData,getOne,addEntry
};