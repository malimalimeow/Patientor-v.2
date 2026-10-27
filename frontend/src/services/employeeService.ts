import { NewEmployeeForm ,updatePasswordForm,UpdateEmployeeType} from "../types";
import apiClient from "./apiClient"

const baseUrl="/api/employees";

let token:string|null = null;

const setToken = (newToken:string) => {
  token = `Bearer ${newToken}`;
};


const getAll=async()=>{
    const config = {
    headers: { Authorization: token },
  };

    const {data}= await apiClient.get(baseUrl,config);

    return data;
};

const getOne = async(id:string)=>{
    const config = {
    headers: { Authorization: token },
  };

    const {data}= await apiClient.get(`${baseUrl}/${id}`,config);
    return data;
};

const createNewEmployee = async(object:NewEmployeeForm)=>{
    const config = {
    headers: { Authorization: token },
  };

    const {data}=await apiClient.post(baseUrl,object,config);
    return data;
};

const updatePassword= async(id:string,object:updatePasswordForm)=>{
    const config = {
    headers: { Authorization: token },
  };

    const {data}=await apiClient.patch(`${baseUrl}/${id}/password`,object,config);
    return data;
};

const updateDetails = async(id:string, object:UpdateEmployeeType)=>{
    const config = {
    headers: { Authorization: token },
  };

    const {data}=await apiClient.patch(`${baseUrl}/${id}/details`,object,config);
    return data;
};

const deleteEmployee = async (id:string)=>{
    const config = {
    headers: { Authorization: token },
  };

    const {data}= await apiClient.delete(`${baseUrl}/${id}`,config);
    return data;
};




export default {setToken,getAll,getOne,createNewEmployee,updatePassword,updateDetails,deleteEmployee};
