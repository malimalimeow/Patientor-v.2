import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Employee from "../models/employee.ts";
import Patient from "../models/patient.ts";
import Diagnosis from "../models/dignosis.ts";
import config from "./config.ts";
import { diagnosisSeedData } from "./diagnosis.ts"

console.log("ready??");

const seed =async()=>{
    try{
        if(!config.MONGODB_URI){throw new Error("Can't find Db");}
        await mongoose.connect(config.MONGODB_URI);
        console.log("connected to Mongo Db");

        await Patient.deleteMany({});
        await Employee.deleteMany({});
        await Diagnosis.deleteMany({});

        //add diagnosis
         const insertedDiagnosis = await Diagnosis.insertMany(diagnosisSeedData);
        console.log(`added ${insertedDiagnosis.length} diagnosis codes`);

        //add master employee
        const passwordHash = await bcrypt.hash("Password123!",10);
        const master = new Employee({
           name: "Master Admin H",
            username: "H2b3c4d", 
            passwordHash,
            title: "System Master Administrator",
            dateOfBirth: "1994-09-28",
            NI: "BC123456A",
            address: "14,Liverpool",
            emergencyContact: "123456789",
            gender: "female",
            role: "master" 
        });

    await master.save();
    console.log("master ready");
    }catch(error){
        console.log("something went wrong",error);
    }finally{
        await mongoose.connection.close();
    }
};

void seed();