export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export const Gender = {
  Male : "male",
  Female : "female",
  Other : "other"
}as const;

export type Gender = typeof Gender[keyof typeof Gender];


export const HealthCheckRatings = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

export type HealthCheckRating = typeof HealthCheckRatings[keyof typeof HealthCheckRatings];


interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export type BaseEntryForm = Omit<BaseEntry, "id">;

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge:Discharge
}
export interface Discharge{
    date:string
    criteria:string
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare"
    employerName :string
    sickLeave?:SickLeave
}

export type OccupationalForm =Omit<OccupationalHealthcareEntry,"id">

export interface SickLeave {
    startDate: string
    endDate: string
}


export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

type UnionOmit<T,K extends string|number|symbol>=T extends unknown ? Omit<T,K>:never
//kinda like a function here T=>type, K=>key, in string/number/symbol(constraint)= (Ternary)when a type extends something? type omit that key 

export type EntryFormValues= UnionOmit<Entry,"id">

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn: string;
  dateOfBirth?: string;
  entries?:Entry[]
}

export type PatientFormValues = Omit<Patient, "id">;

export const EntryType = {
  Hospital: "Hospital",
  OccupationalHealthcare: "OccupationalHealthcare",
  HealthCheck: "HealthCheck",
} as const;

export type EntryTypes = (typeof EntryType)[keyof typeof EntryType];

export interface message {
  message: string;
  isError: boolean;
}