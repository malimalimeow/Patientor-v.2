import { z } from 'zod';
import type { TypeOf } from 'zod/v3';

export const Gender ={ 
  male:'male',female:'female',other:'other'}as const;

export const Role={
  admin:'admin',normal:'normal',master:'master'
}as const;

export const NewEmployeeSchema = z.object({
    name: z.string(),
    password: z.string(),
    title:z.string(),
    dateOfBirth: z.iso.date(),
    NI:z.string(),
    address: z.string(),
    emergencyContact: z.number(),
    gender: z.enum(Object.values(Gender)),
    role:z.enum(Object.values(Role))
});



export const DiagnosisSchema = z.object({
    code: z.string(),
    name: z.string(),
    latin: z.string().optional()
});



export const NewPatientSchema= z.object({
        name: z.string(),
        dateOfBirth: z.iso.date(),
        ssn: z.string(),
        gender: z.enum(Object.values(Gender)),
        occupation:z.string(),
        entries:z.array(z.unknown()).default([])
       });

export const NewBaseEntrySchema =z.object({
  
  description: z.string(),
  date:z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional()
});


export const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

export const HealthCheckSchema= NewBaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
])});


export const  HospitalSchema =NewBaseEntrySchema.extend({
    type: z.literal("Hospital"),
    discharge:z.object({
  date:z.iso.date(),
  criteria:z.string()
})});

export const OccupationalSchema=NewBaseEntrySchema.extend({
   type: z.literal("OccupationalHealthcare"),
    employerName :z.string(),
    sickLeave:z.object({
      startDate: z.string(),
    endDate: z.string()
    }).optional()
});

export const NewEntrySchema=z.discriminatedUnion("type",[HealthCheckSchema,HospitalSchema,OccupationalSchema]);


export type GenderType = typeof Gender[keyof typeof Gender];

export type NewPatientType =z.infer<typeof NewPatientSchema>;

export type HealthCheckEntryType =z.infer<typeof HealthCheckSchema>;

export type HospitalEntryType =z.infer<typeof HospitalSchema>;

export type OccupationalHealthcareEntryType =z.infer<typeof OccupationalSchema>;

export type NewEntryType =z.infer<typeof NewEntrySchema>;

export type DiagnosisType =z.infer<typeof DiagnosisSchema>;

export type NewEmployeeType =z.infer<typeof NewEmployeeSchema>;

export const EmployeeSchema =NewEmployeeSchema.omit({password:true}).extend({id:z.string(),passwordHash:z.string(),username:z.string()});

export type EmployeeType =z.infer<typeof EmployeeSchema>;

export type NonSensitiveEmployee = Omit<EmployeeType,'NI'|'address'|'passwordHash'>;

export const PatientSchema= NewPatientSchema.extend({ id:z.string() });

export type PatientType=z.infer<typeof PatientSchema>;

export type NonSensitivePatient = Omit<PatientType, 'ssn'|'entries'>;

export const EntrySchema=NewEntrySchema.and(z.object({id:z.string()}));

export type EntryType=z.infer<typeof EntrySchema>;

export const updatePasswordSchema = z.object({
  oldPassword:z.string().min(8,"Old password is required"),
  newPassword:z.string().min(8,"New password is required,minimum 8 characters")
});

export type updatePasswordType= z.infer<typeof updatePasswordSchema>;

export const updateEmployeeSchema= EmployeeSchema.pick({
    name:true,
    title:true,
    dateOfBirth: true,
    NI:true,
    address: true,
    emergencyContact: true,
    gender:true,
}).partial();

export type updateEmployeeType= z.infer<typeof updateEmployeeSchema>;

export const loginSchema=z.object({
  username:z.string().regex(/^[A-Za-z][0-9a-fA-F]{6}$/,"username invalid"),
  password:z.string().min(8,"password is required,minimum 8 characters")
});

//type UnionOmit<T,K extends string|number|symbol>=T extends unknown ? Omit<T,K>:never
//kinda like a function here T=>type, K=>key, in string/number/symbol(constraint)= (Ternary)when a type extends something? type omit that key 

