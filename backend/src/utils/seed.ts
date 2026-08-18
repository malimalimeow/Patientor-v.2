import mongoose from "mongoose";
import bcrypt from "bcrypt"
import Employee from "../models/employee.ts"
import config from "./config.ts";

console.log("ready??")

const createFirstMaster =async()=>{
    try{
        if(!config.MONGODB_URI){throw new Error("Can't find Db")}
        await mongoose.connect(config.MONGODB_URI)
        console.log("connected to Mongo Db")

        const existingMaster = await Employee.findOne({role:"master"})
        if (existingMaster){
            console.log("Master already exists.")
            return
        }

        const passwordHash = await bcrypt.hash("Password123!",10)

        const master = new Employee({
           name: "Master Admin",
      username: "M1a2b3c", 
      passwordHash,
      title: "System Master Administrator",
      dateOfBirth: "1990-01-01",
      NI: "MA111111A",
      address: "Headquarters 1, London",
      emergencyContact: 91111111,
      gender: "other",
      role: "master" 
        })

    await master.save()
    console.log("master ready")
    }catch(error){
        console.log("failed to create Master")
    }finally{
        await mongoose.connection.close()
    }
}

void createFirstMaster()