import type { z } from 'zod';
import type { BaseEntrySchema, EntrySchema, HealthCheckSchema, HospitalSchema, NewEntrySchema, NewPatientSchema, OccupationalSchema, PatientSchema } from "./utils.ts";
export interface Diagnosis {
    code:string;
    name:string;
    latin?:string;
}


export type NonSensitivePatient = Omit<Patient, 'ssn'|'entries'>;

export const Gender ={ male:'male',female:'female',other:'other'}as const;

export type Gender = typeof Gender[keyof typeof Gender];

export type NewPatient =z.infer<typeof NewPatientSchema>;

export type Patient=z.infer<typeof PatientSchema>;


export type BaseEntry =z.infer<typeof BaseEntrySchema>;

export type HealthCheckEntry =z.infer<typeof HealthCheckSchema>;

export type HospitalEntry =z.infer<typeof HospitalSchema>;

export type OccupationalHealthcareEntry =z.infer<typeof OccupationalSchema>;


export type Entry =z.infer<typeof EntrySchema>;

export type NewEntry =z.infer<typeof NewEntrySchema>;

//type UnionOmit<T,K extends string|number|symbol>=T extends unknown ? Omit<T,K>:never
//kinda like a function here T=>type, K=>key, in string/number/symbol(constraint)= (Ternary)when a type extends something? type omit that key 


