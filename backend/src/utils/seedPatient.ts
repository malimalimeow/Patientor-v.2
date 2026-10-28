import mongoose from "mongoose";
import config from "./config.ts";
import Patient from "../models/patient.ts";
import { patientSeedData } from "./patientSeedData.ts";

const seedPatient =async()=>{
    try {
        if(!config.MONGODB_URI){throw new Error("Can't find Db");}
                await mongoose.connect(config.MONGODB_URI);
                console.log("connected to Mongo Db");

        const newPatientData= await Patient.insertMany(patientSeedData)
        console.log(`added ${newPatientData.length} patients`);
    }catch(error){
            console.log("something went wrong",error);
        }finally{
            await mongoose.connection.close();
        }
    };
    
void seedPatient();

