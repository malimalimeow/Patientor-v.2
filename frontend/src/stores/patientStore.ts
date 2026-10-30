import { create } from "zustand";
import type { Entry, EntryFormValues,  Patient,PatientFormValues, UpdateEntryType, UpdatePatientType} from "../types";
import patientService from "../services/patientService";
import { useShallow } from "zustand/shallow";

interface patientState {
    patients:Patient[]|[],
    showPatient:Patient|null,
    toUpdateEntry:Entry|null,
    filter:string|""
    actions:{
        setFilter:(v:string)=>void
        selectedEntry:(entry:Entry|null)=>void
        fetchPatientList:()=>Promise<void>
        getOnePatient:(id:string)=>Promise<void>
        createPatient:(values:PatientFormValues)=>Promise<void>
        updatePatientDetails:(id:string,values:UpdatePatientType)=>Promise<void>
        createEntry:(id:string,values: EntryFormValues)=>Promise<void>
        updateEntry:(id:string,values:UpdateEntryType,entryId:string)=>Promise<void>
        deletePatient:(id:string)=>Promise<unknown>
       
    }
}

export const usePatientStore=create<patientState>((set)=>({
    patients:[],
    showPatient:null,
    toUpdateEntry:null,
    filter:"",
    actions:{
        setFilter:value=>set(()=>({filter:value})),
        selectedEntry:(entry)=>set({toUpdateEntry:entry}),
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
        updatePatientDetails:async(id,values)=>{
            const data = await patientService.updatePatient(id,values);
            set((state)=>({patients:state.patients.map(p=>p.id===id?data:p),
                showPatient:state.showPatient?.id===id?data:state.showPatient}));
        },
        createEntry:async(id,values)=>{
            const data = await patientService.addEntry(id,values);
            set((state)=>({showPatient:state.showPatient?{
                ...state.showPatient,
                entries:state.showPatient?.entries?
                state.showPatient.entries.concat(data):[data]}:null}));
        },
        updateEntry:async(id,values,entryId)=>{
            const data = await patientService.updateEntry(id,values,entryId);

            set((state)=>({
                showPatient:state.showPatient?{...state.showPatient,entries:state.showPatient?.entries?.map(e=>e._id===entryId?data:e)
            }:null, toUpdateEntry:data}));    
            
        },
        deletePatient:async(id)=>{
            const data = await patientService.deletePatient(id);
            set((state)=>({patients:state.patients.filter(p=>p.id!==id)}));
            return data;
        }

    }
}));

export const useToUpdateEntry=()=>usePatientStore((state)=>state.toUpdateEntry);
export const usePatients=()=>{
    const patients=usePatientStore(useShallow((state)=>state.patients));
const filter=usePatientStore((state)=>state.filter).trim().toLowerCase()
if (filter!=="") return patients.filter(p=> p.name.toLowerCase().includes(filter) ||
      p.dateOfBirth?.includes(filter))

return patients
}

export const useShowPatient=()=> {
    const showPatient=usePatientStore(useShallow((state)=>state.showPatient))
const filter=usePatientStore((state)=>state.filter).trim().toLowerCase()
if (filter!=="" && showPatient) return {...showPatient,entries:showPatient?.entries?.filter(entry=>JSON.stringify(entry).toLowerCase().includes(filter))}

return showPatient}
export const usePatientActions=()=> usePatientStore((state)=>state.actions);

