import Employee from '../models/employee';
import type { NonSensitiveEmployee, EmployeeType} from '../zodSchemas.ts';
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
    const employee= Employee.findById(id)
    if(employee===null){
        throw new Error("Employee not found")
    }

    return employee
}


export default {getAllEmployee,getOneEmployee}