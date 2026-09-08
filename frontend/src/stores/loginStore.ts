import {create} from "zustand"
import { devtools } from "zustand/middleware";
import loginService from "../services/loginService"
import { getEmployee, saveEmployee, removeEmployee } from "../services/persistentEmployee"
import patientService from "../services/patientService";
import employeeService from "../services/employeeService";
import { loginForm } from "../types";
import axios from "axios";

interface useLoginState{
    login:boolean
    employee:{name:string,id:string, role:string,token:string}|null
    actions:{
        handle401:(error:unknown)=>void;
        initialEmployee:()=>void;
        toLogin:(loginData:loginForm)=>Promise<void>;
        logout:()=>void
    }
}

export const useLoginStore= create<useLoginState>()(devtools((set,get)=>({
    login:false,
    employee:null,
    actions:{
        handle401:(error:unknown)=>{
            if (axios.isAxiosError(error) && error.response?.status===401){
                get().actions.logout()
                return true
            }
        return false
        },

        initialEmployee:()=>{
            const existedEmployee = getEmployee()
            if (existedEmployee){
                set(()=>({employee: existedEmployee,login:true}))
                patientService.setToken(existedEmployee.token)
                employeeService.setToken(existedEmployee.token)
            }
        },
        toLogin:async(loginData:loginForm)=>{
            const employee =await loginService.toLogin(loginData)
            saveEmployee(employee)
            patientService.setToken(employee.token)
            employeeService.setToken(employee.token)
            set(()=>({employee:employee,login:true}))
        },
        logout:()=>{
            removeEmployee()
            set(()=>({employee:null,login:false}))
        }

    }
})))

export const useLogin = ()=> useLoginStore(state=>state.login)
export const useLoginEmployee=()=>useLoginStore(state=>state.employee)
export const useLoginAction=()=>useLoginStore(state=>state.actions)