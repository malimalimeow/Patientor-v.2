import mongoose, {Schema }from "mongoose";

import type { NewPatientType , NewEntryType} from "../zodSchemas.ts";
import { Gender,HealthCheckRating } from "../zodSchemas.ts";

const MongoBaseEntrySchema =new Schema<NewEntryType>({
      description:{
            type: String,
            required: true,
         },
      date:{
            type: String,
            required: true,
         },
      specialist: {
            type: String,
            required: true,
         },
      diagnosisCodes: [{
            type: String,
         }]},
         {discriminatorKey: "type"}); //use "type" to define which model, generate with id.

const MongoPatientSchema = new Schema<NewPatientType>({
    name: {
            type: String,
            required: true,
         },
        dateOfBirth: {
            type: String, required: true 
        },
        ssn: {
            type: String,
            required: true,
         },
        gender: {type:String,
            enum:Object.values(Gender),
            required: true,
         },
        occupation:{
            type: String,
            required: true,
         },
        entries:[MongoBaseEntrySchema]});

const entriesArray= MongoPatientSchema.path('entries');

entriesArray.discriminator("hospital",new Schema({
     discharge:{
      date:{
            type: String, required: true 
        },
      criteria:{
            type: String, required: true 
        },
}}, { _id: false }));

entriesArray.discriminator("healthCheck", new Schema({
    healthCheckRating:{
        type:Number,
        enum:Object.values(HealthCheckRating),
        required:true
    }
}, { _id: false }));

entriesArray.discriminator("OccupationalHealthcare", new Schema({
     employerName :{
            type: String, required: true 
        },
        sickLeave:{
          startDate: {
            type: String
        },
        endDate: {
            type: String
        },
        }
}, { _id: false }));

MongoPatientSchema.set("toJSON", {
  transform: (_document, returnedObject:Record<string,any>) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

//To transform data: . _id=>id
//Record<string(Key),any(values)>. It allows for flexibility in the structure of the returned object, 
// accommodating various properties that may be present in the MongoDB document.

MongoBaseEntrySchema.set("toJSON", {
  transform: (_document, returnedObject:Record<string,any>) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Patient = mongoose.model("Patient", MongoPatientSchema);

export default Patient;