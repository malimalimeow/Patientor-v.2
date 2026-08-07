import type { Entry, NewEntry, NewPatient, Patient } from "./types.ts";
import { Gender } from "./types.ts";
import { z } from 'zod';


export const NewPatientSchema= z.object({
        name: z.string(),
        dateOfBirth: z.iso.date(),
        ssn: z.string(),
        gender: z.enum(Gender),
        occupation:z.string(),
        entries:z.array(z.unknown()).default([])
       });

export const PatientSchema= NewPatientSchema.extend({ id:z.string() });

export const NewBaseEntrySchema =z.object({
  
  description: z.string(),
  date:z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional()
});

export const BaseEntrySchema = z.object({
  id:z.string(),
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

export const EntrySchema=NewEntrySchema.and(z.object({id:z.string()}));

export const parseNewEntry =(object:unknown):NewEntry=>{
  return NewEntrySchema.parse(object);
};

export const parseEntry =(object:unknown):Entry=>{
  return EntrySchema.parse(object);
};

 export const parseNewPatient = (object:unknown):NewPatient=>{
   return NewPatientSchema.parse(object);};

  export const parseOnePatient =(object:unknown):Patient=>{
    return PatientSchema.parse(object);
  };


