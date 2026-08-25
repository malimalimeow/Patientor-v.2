import { create } from "zustand";
import type{ Diagnosis } from "../types";
import diagnosesService from "../services/diagnosesService";

interface diagnosisState {
    diagnoses:Diagnosis[]|[]
    actions:{
        fetchDiagnoses:()=>Promise<void>
    }
}

export  const useDiagnosesStore =create<diagnosisState>((set)=>({
    diagnoses:[],
    actions:{
        fetchDiagnoses : async () => {
              const data = await diagnosesService.getAll();
              set({diagnoses:data})
        }}
    }))

export const useDiagnoses=()=> useDiagnosesStore((state)=>state.diagnoses);
export const useDiagnosesAction=()=>useDiagnosesStore((state)=>state.actions)