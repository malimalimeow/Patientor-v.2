import Patient from "../models/patient.ts";

import type { NewEntryType, NonSensitivePatient ,PatientType,NewPatientType ,EntryType, updatePatientType,updateEntryType} from "../zodSchemas.ts";




//can take all the data, should not export to any file!!
/*const getData=():Patients[]=>{
    return patients;
}*/

const getNonSensitiveData=async():Promise<NonSensitivePatient[]> =>{
    const AllData= await Patient.find({}).select({name:1,gender:1,dateOfBirth:1,occupation:1});
    return AllData;
};

const getOne=async (id:string):Promise<PatientType|null>=>{
    const patient= await Patient.findById(id);
    if (patient===null){
        return null;
    }
    return patient;
};

const addData=async(data:NewPatientType):Promise<PatientType>=>{
    const newPatient= new Patient(data);
    const savedPatient = await newPatient.save();
    return savedPatient;
};

const addEntry=async(id:string,data:NewEntryType):Promise<EntryType|null>=>{
    const patient= await Patient.findById(id);
    if(!patient){
        return null;
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
    const patient= await Patient.findById(id);
    if(!patient){
        return null;
    }

    if (Object.keys(data).length===0){
        return "everything up-to-date";
    }

    const updatedPatient= await Patient.findByIdAndUpdate(id,{$set:data},{returnDocument: 'after',runValidators:true});
        return updatedPatient; 
};

const updateEntry = async(id:string,data:updateEntryType,entryID:string)=>{
    const patient=await Patient.findById(id)

    if(!patient){return null}

    if(Object.keys(data).length===0){
        return "everything up-to-date"
    }
    const patientEntry=patient.entries as EntryType[]
    const entry=patientEntry.find(e=>e.id===entryID)

    if(!entry){return null}else if(entry.finish===true){return "File closed"}

    Object.assign(entry, data)

    await patient.save()

    return entry
    
}


const deletePatient=async (patientId:string):Promise<void|null>=>{
    const patient= await Patient.findByIdAndDelete(patientId);
    if(!patient){
        return null;}
    return ;  
};

export default{
    addData,getNonSensitiveData,getOne,addEntry, deletePatient,updatePatient,updateEntry
};