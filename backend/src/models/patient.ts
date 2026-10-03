import mongoose, {Schema,type Types }from "mongoose";
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
        gender: {type:String,
            enum:Object.values(Gender),
            required: true,
         },
        occupation:{
            type: String,
            required: true,
         },
        entries:[MongoBaseEntrySchema]});

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
const entriesArray= MongoPatientSchema.path('entries') as Schema.Types.DocumentArray;

entriesArray.discriminator("Inpatient",new Schema({
  admissionDate: {type:String, required:true},
  admissionReason:{type:String, required:true},
  dischargeDate: {type:String},
  ward:{type:String},
  bedNumber:{type:String},
  dischargeSummary:{type:String},
  dischargeStatus:{type:String},
  followUpInstruction:{type:String},
}, { _id: false }));

entriesArray.discriminator("HealthCheck", new Schema({
    healthCheckRating:{
        type:Number,
        enum:Object.values(HealthCheckRating),
        required:true
    }
}, { _id: false }));

const prescriptionSchema= new Schema({
        medication:{type:String},
        dosage:{type:String},
        frequency:{type:String},
       }, { _id: false });

entriesArray.discriminator("Outpatient", new Schema({
    department:{type:String, required:true},
       chiefComplaint:{type:String, required:true},
       vitalSigns:{
        bp:{type:String},
        pulse:{type:Number},
        temperature:{type:Number},
       },
       prescription:{type:[prescriptionSchema],default:[]},
       followUpDate:{type:String}
}, { _id: false }));

MongoPatientSchema.set("toJSON", {
  transform: (_document, returnedObject:Record<string,unknown>) => {
     if(returnedObject._id){const id = returnedObject._id as Types.ObjectId;
      returnedObject.id = id.toString();}
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

//To transform data: . _id=>id
//Record<string(Key),any(values)>. It allows for flexibility in the structure of the returned object, 
// accommodating various properties that may be present in the MongoDB document.

MongoBaseEntrySchema.set("toJSON", {
  transform: (_document, returnedObject:Record<string,unknown>) => {
    if(returnedObject._id){const id = returnedObject._id as Types.ObjectId;
      returnedObject.id = id.toString();}
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Patient = mongoose.model("Patient", MongoPatientSchema);

export default Patient;