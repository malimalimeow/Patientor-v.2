import Employee from '../models/employee.ts';
import type {NewEmployeeType,EmployeeType,updatePasswordType,updateEmployeeType} from '../zodSchemas.ts';
import bcrypt from "bcrypt";
import { v4 as uuid} from "uuid";


const getAllEmployee= async():Promise<Omit<EmployeeType,"passwordHash">[]>=>{
    const allEmployee= await Employee.find({}).select('-passwordHash')
    return allEmployee}


const getOneEmployee=async(id:string):Promise<EmployeeType>=>{
    const employee= await Employee.findById(id);
    if(employee===null){
        throw new Error("Employee not found");
    }

    return employee;
};

const addEmployee=async(newData:NewEmployeeType):Promise<Omit<EmployeeType,"passwordHash">>=>{
    const firstLetter = newData.name?.charAt(0).toUpperCase()||"M";
    const shortUUID= uuid().slice(0,6);
    const userId=`${firstLetter}${shortUUID}`;
    const saltRounds=10;

    if(!newData.password || newData.password.length<=2){
        throw new Error ("password doesn't meet requirement");}

    const passwordHash=await bcrypt.hash(newData.password,saltRounds);
    // eslint-disable-next-block @typescript-eslint/no-unused-vars
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password:_password,...otherData}=newData;
    const formattedData= {...otherData,passwordHash:passwordHash,username:userId};
    const newEmployee= new Employee(formattedData);
    const savedEmployee = await newEmployee.save();
    const savedObject= savedEmployee.toJSON()
    const {passwordHash:_hashedPassword,...allData}=savedObject
     return {...allData}
};

const updatePassword= async(id:string,Password:updatePasswordType):Promise<void>=>{
    const employee= await Employee.findById(id);
    if(!employee){
        throw new Error(`can't find employee ${id}`);
    }
    const saltRounds=10;
    const newPassword=Password.newPassword
    if(newPassword && newPassword.length>2){
        const passwordHash=await bcrypt.hash(newPassword,saltRounds);
        employee.passwordHash=passwordHash;
        await employee.save();
    }
    return;
};

const updateDetails = async(id:string,updateData:updateEmployeeType)=>{
    
    if (Object.keys(updateData).length===0){
        throw new Error("Everything up-to-date");
    }

    const employee= await Employee.findById(id);
    if(!employee){
        throw new Error(`can't find employee ${id}`);
    }

    const updatedEmployee= await Employee.findByIdAndUpdate(id,{$set:updateData},{returnDocument: 'after',runValidators:true});
    return updatedEmployee;

};

const removeEmployee =async(id:string)=>{
    const employee= await Employee.findByIdAndDelete(id);
if(!employee){
        throw new Error(`can't find employee ${id}`);
    }
    return;
};
    

export default {getAllEmployee,getOneEmployee,addEmployee,updatePassword,updateDetails,removeEmployee};