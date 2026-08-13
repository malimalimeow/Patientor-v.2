import { $ZodEncodeError } from 'zod/v4/core';
import Employee from '../models/employee.ts';
import type { NonSensitiveEmployee, NewEmployeeType,EmployeeType} from '../zodSchemas.ts';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const getAllEmployee= async():Promise<NonSensitiveEmployee[]>=>{
    const allUser =await Employee.find({}).select({name: 1,
        dateOfBirth:1,
        emergencyContact: 1,
        gender:1})

        return allUser
}

const getOneEmployee=async(id:string):Promise<EmployeeType>=>{
    const employee= await Employee.findById(id)
    if(employee===null){
        throw new Error("Employee not found")
    }

    return employee
}

const addEmployee=async(newData:NewEmployeeType):Promise<EmployeeType>=>{
    const saltRounds=10

    if(!newData.password || newData.password.length<=2){
        throw new Error ("password doesn't meet requirement")}

    const passwordHash=await bcrypt.hash(newData.password,saltRounds)
    const {password,...otherData}=newData
    const formattedData= {...otherData,passwordHash:passwordHash}
    const newEmployee= new Employee(formattedData)
    const savedEmployee = await newEmployee.save()
     
     return savedEmployee
}

const updatePassword= async(id:string,newPassword:string):Promise<void>=>{
    const employee= await Employee.findById(id)
    if(!employee){
        throw new Error(`can't find employee ${id}`)
    }
    const saltRounds=10
    if(newPassword && newPassword.length>2){
        const passwordHash=await bcrypt.hash(newPassword,saltRounds)
        employee.passwordHash=passwordHash
        await employee.save()
    }
    return;
}

export default {getAllEmployee,getOneEmployee,addEmployee,updatePassword}