import { create } from "zustand";
import type { EntryFormValues, Patient,PatientFormValues} from "../types";
import patientService from "../services/patientService";

interface patientState {
    patients:Patient[]|[],
    showPatient:Patient|null
    actions:{
        fetchPatientList:()=>Promise<void>
        getOnePatient:(id:string)=>Promise<void>
        createPatient:(values:PatientFormValues)=>Promise<void>
        createEntry:(id:string,values: EntryFormValues)=>Promise<void>
        //deletePatient:()=>Promise<void>
        //deleteEntry:()=>Promise<void>
    }
}

export const usePatientStore=create<patientState>((set)=>({
    patients:[],
    showPatient:null,
    actions:{
        fetchPatientList: async()=>{
            const data= await patientService.getAll();
            set({patients:data});
         },
        
        getOnePatient: async(id)=>{
            set({showPatient:null});
            const data= await patientService.getOne(id);
            set({showPatient:data});
        },
        createPatient:async(values)=>{
            const data = await patientService.create(values);
            set((state)=>({patients:[...state.patients,data]}));
        },
        createEntry:async(id,values)=>{
            const data = await patientService.addEntry(id,values);
            set((state)=>({showPatient:state.showPatient,entries:state.showPatient?.entries?state.showPatient.entries.concat(data):[data]}));
        }

    }
}));

export const usePatients=()=>usePatientStore((state)=>state.patients);
export const useShowPatient=()=> usePatientStore((state)=>state.showPatient);
export const usePatientActions=()=> usePatientStore((state)=>state.actions);

