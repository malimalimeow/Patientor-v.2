import mongoose,{Schema} from "mongoose"
import {Gender, Role} from "../zodSchemas.ts"
import type {EmployeeType} from "../zodSchemas.ts"

const MongoEmployeeSchema = new Schema<EmployeeType>({
    name: { type: String, required: true },
    passwordHash:{ type: String, required: true },
    dateOfBirth: { type: String, required: true },
    NI: { type: String, required: true },
    address: { type: String, required: true },
    emergencyContact: { type: Number},
    gender: { type: String, enum: Object.values(Gender), required: true},
    role:{type:String,enum:Object.values(Role),default:"normal"}})

MongoEmployeeSchema.set("toJSON", {
  transform: (_document, returnedObject:Record<string,any>) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Employee = mongoose.model("Employee", MongoEmployeeSchema);

export default Employee;