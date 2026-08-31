import {create } from "zustand"

import employeeService from "../services/employeeService"

import { devtools } from "zustand/middleware"

import { EmployeeType,NewEmployeeForm ,updatePasswordForm,UpdateEmployeeForm} from "../types"

interface employeeState{
    employee:EmployeeType[]|[]
    showEmployee:EmployeeType|null
    actions:{
        getAllEmployee:()=>void
        getOneEmployee:(id:string)=>void
        createEmployee:(values:NewEmployeeForm)=>void
        updateEmployeePassword:(id:string,values:updatePasswordForm)=>void
        updateEmployeeDetail:(id:string,values:UpdateEmployeeForm)=>void
        deleteEmployee:(id:string)=>void
    }
}

export const useEmployeeStore=create<employeeState>()(devtools((set,get)=>({
    employee:[],
    showEmployee:null,
    actions:{
        getAllEmployee:async()=>{
            const allEmployee= await employeeService.getAll()
            set({employee:allEmployee})
        },
        getOneEmployee:async(id:string)=>{
            const oneEmployee = await employeeService.getOne(id)
            set({showEmployee:oneEmployee})
        },
        createEmployee:async(value:NewEmployeeForm)=>{
            const newEmployee= await employeeService.createNewEmployee(value)
            set((state)=>({employee:[...state.employee,newEmployee]}))
        },
        updateEmployeePassword:async(id:string,value:updatePasswordForm)=>{
            await employeeService.updatePassword(id,value)
        },
        updateEmployeeDetail:async(id:string,value:UpdateEmployeeForm)=>{
            const updatedEmployee=await employeeService.updateDetails(id,value)
            set((state)=>({employee:state.employee.map(e=>e.id===updatedEmployee.id?updatedEmployee:e),
                showEmployee:state.showEmployee?.id===id? updatedEmployee:state.showEmployee
            }))
        },
        deleteEmployee:async(id:string)=>{
            await employeeService.deleteEmployee(id)
            set((state)=>({employee:state.employee.filter(e=>e.id!==id)}))
        }
    }

})))


export const useEmployee=()=>useEmployeeStore(state=>state.employee)
export const useShowEmployee=()=>useEmployeeStore(state=>state.showEmployee)
export const useEmployeeActions=()=>useEmployeeStore(state=>state.actions)