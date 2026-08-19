import { z } from 'zod';


export const Gender ={ 
  male:'male',female:'female',other:'other'}as const;

export const Role={
  admin:'admin',normal:'normal',master:'master'
}as const;

export const NewEmployeeSchema = z.object({
    name: z.string().trim().min(1,"name required"),
    password: z.string().trim().min(8, "password accept 8-16 characters only").max(16,"password accept 8-16 characters only").regex(/^[0-9a-zA-Z!*#@$%^&]+$/,"password contains invalid characters"),
    title:z.string().trim().min(1,"title required"),
    dateOfBirth: z.string().date(),
    NI:z.string().trim().regex(/^[A-CEG-HJ-PR-TW-Z][A-CEG-HJ-NP-TW-Z][0-9]{6}[ABCD]$/,"Invalid UK National Insurance Number format"),
    address: z.string().trim().min(1,"address required"),
    emergencyContact: z.string().trim().regex(/^[0-9]{8,15}$/,"Invalid emergency contact number"),
    gender: z.nativeEnum(Gender),
    role:z.nativeEnum(Role)
});



export const DiagnosisSchema = z.object({
    code: z.string().trim().min(1,"code required"),
    name: z.string().trim().min(1,"name required"),
    latin: z.string().optional()
});



export const NewPatientSchema= z.object({
        name: z.string().trim().min(1,"name required"),
        dateOfBirth: z.string().date(),
        gender: z.nativeEnum(Gender),
        occupation:z.string().trim().min(1,"occupation required"),
        entries:z.array(z.unknown()).default([])
       });

export const NewBaseEntrySchema =z.object({
  
  description: z.string().trim().min(1,"description required"),
  date: z.string().date(),
  specialist: z.string().trim().min(1,"specialist required"),
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
  date:z.string().date(),
  criteria:z.string().trim().min(1,"criteria required")
})});

export const OccupationalSchema=NewBaseEntrySchema.extend({
   type: z.literal("OccupationalHealthcare"),
    employerName :z.string().trim().min(1,"employerName required"),
    sickLeave:z.object({
      startDate:z.string().date(),
    endDate: z.string().date()
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

export type loginType=z.infer<typeof loginSchema>;

//type UnionOmit<T,K extends string|number|symbol>=T extends unknown ? Omit<T,K>:never
//kinda like a function here T=>type, K=>key, in string/number/symbol(constraint)= (Ternary)when a type extends something? type omit that key 

