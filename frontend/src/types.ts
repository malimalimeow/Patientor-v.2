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
  finish:boolean;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export type BaseEntryForm = Omit<BaseEntry, "id">;

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;}

interface InpatientEntry extends BaseEntry {
    type: "Inpatient";
    admissionDate: string
    admissionReason:string
    dischargeDate?: string
    ward?:string
    bedNumber?:string
    dischargeSummary?:string
    dischargeStatus?:string
    followUpInstruction?:string
    
}

export interface vitalSigns{
  bp?:string,
    pulse?:number,
    temperature?:number
}

export interface prescription{
  medication:string
    dosage:string
    frequency:string
}


export interface OutpatientEntry extends BaseEntry {
    type: "Outpatient";
    department:string
   chiefComplaint:string
   vitalSigns?:vitalSigns
   prescription?:prescription[]
   followUpDate?:string

}



export type Entry =
  | InpatientEntry
  | OutpatientEntry
  | HealthCheckEntry;


type UnionOmit<T,K extends string|number|symbol>=T extends unknown ? Omit<T,K>:never
//kinda like a function here T=>type, K=>key, in string/number/symbol(constraint)= (Ternary)when a type extends something? type omit that key 

export type UpdateEntryType = Partial<Omit<Entry, "id" | "_id" | "type">>
export type EntryFormValues= UnionOmit<Entry,"id">

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  dateOfBirth?: string;
  entries?:Entry[]
}

export type PatientFormValues = Omit<Patient, "id">;

export const EntryType = {
  Inpatient:"Inpatient",
  Outpatient: "Outpatient",
  HealthCheck: "HealthCheck",
} as const;

export type EntryTypes = (typeof EntryType)[keyof typeof EntryType];

export interface message {
  message: string;
  isError: boolean;
}

export const Role={
  admin:'admin',normal:'normal',master:'master'
}as const;

export type Role = typeof Role[keyof typeof Role];
export interface NewEmployeeForm {
  name: string;
  password: string;
  title: string;
  dateOfBirth: string;
  NI: string;
  address: string;
  emergencyContact: string;
  gender: Gender;
  role: Role;
}

export interface updatePasswordForm {
  oldPassword:string,
  newPassword:string
}

export interface UpdateEmployeeForm {
  name?: string;
  title?: string;
  dateOfBirth?: string;
  NI?: string;
  address?: string;
  emergencyContact?: string;
  role?: Role;
}

export interface UpdatePatientForm{
  name?: string;
  occupation?: string;
  gender?: Gender;
  dateOfBirth?: string;
}

export interface loginForm{
  username:string;
  password:string;
};

export interface token{
  name:string;
  id:string;
  role:Role;
  token:string
}

export type EmployeeType = Omit<NewEmployeeForm ,"password">& {id:string,passwordHash:string,username:string};