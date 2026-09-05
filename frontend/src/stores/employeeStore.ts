import {create } from "zustand"

import employeeService from "../services/employeeService"

import { devtools } from "zustand/middleware"

import { EmployeeType,NewEmployeeForm ,updatePasswordForm,UpdateEmployeeForm} from "../types"

interface employeeState{
    employee:EmployeeType[]|[]
    showEmployee:EmployeeType|null
    actions:{
        getAllEmployee:()=>Promise<EmployeeType[]>
        getOneEmployee:(id:string)=>Promise<EmployeeType>
        createEmployee:(values:NewEmployeeForm)=>Promise<EmployeeType>
        updateEmployeePassword:(id:string,values:updatePasswordForm)=>Promise<void>
        updateEmployeeDetail:(id:string,values:UpdateEmployeeForm)=>Promise<EmployeeType>
        deleteEmployee:(id:string)=>Promise<void>
    }
}

export const useEmployeeStore=create<employeeState>()(devtools((set)=>({
    employee:[],
    showEmployee:null,
    actions:{
        getAllEmployee:async()=>{
            const allEmployee= await employeeService.getAll()
            set({employee:allEmployee})
            return allEmployee
        },
        getOneEmployee:async(id:string)=>{
            const oneEmployee = await employeeService.getOne(id)
            set({showEmployee:oneEmployee})
            return oneEmployee
        },
        createEmployee:async(value:NewEmployeeForm)=>{
            const newEmployee= await employeeService.createNewEmployee(value)
            set((state)=>({employee:[...state.employee,newEmployee]}))
            return newEmployee
        },
        updateEmployeePassword:(id:string,value:updatePasswordForm)=>{
            return employeeService.updatePassword(id,value)
        },
        updateEmployeeDetail:async(id:string,value:UpdateEmployeeForm)=>{
            const updatedEmployee=await employeeService.updateDetails(id,value)
            set((state)=>({employee:state.employee.map(e=>e.id===updatedEmployee.id?updatedEmployee:e),
                showEmployee:state.showEmployee?.id===id? updatedEmployee:state.showEmployee
            }))
            return updatedEmployee
        },
        deleteEmployee:async(id:string)=>{
            const response = await employeeService.deleteEmployee(id)
            set((state)=>({employee:state.employee.filter(e=>e.id!==id)}))
            return response
        }
    }

})))


export const useEmployee=()=>useEmployeeStore(state=>state.employee)
export const useShowEmployee=()=>useEmployeeStore(state=>state.showEmployee)
export const useEmployeeActions=()=>useEmployeeStore(state=>state.actions)