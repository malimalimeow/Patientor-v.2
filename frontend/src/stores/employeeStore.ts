import {create } from "zustand"

import employeeService from "../services/employeeService"

import { devtools } from "zustand/middleware"

import { EmployeeType,NewEmployeeForm ,updatePasswordForm,UpdateEmployeeForm} from "../types"

interface employeeState{
    employee:EmployeeType[]|null
    showEmployee:EmployeeType|null
    actions:{
        getAllEmployee:()=>void
        getOneEmployee:(id:string)=>void
        createEmployee:(values:NewEmployeeForm)=>void
        updateEmployeePassword:(values:updatePasswordForm)=>void
        updateEmployeeDetail:(values:UpdateEmployeeForm)=>void
        deleteEmployee:()=>void
    }
}

export const useEmployeeStore=create<employeeState>(devtools(set,get)=>({
    employee:null,
    showEmployee:null,
    actions:{
        getAllEmployee:async()=>{
            const allEmployee= await employeeService.getAll()
            set({employee:allEmployee})
        },
        getOneEmployee:
        createEmployee:
        updateEmployeePassword:
        updateEmployeeDetail:
        deleteEmployee:
    }

}))