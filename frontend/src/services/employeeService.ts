import axios from "axios";
import { NewEmployeeForm ,updatePasswordForm,UpdateEmployeeForm} from "../types";

const baseUrl="/api/employees";

let token = null;

const setToken = (newToken:string) => {
  token = `Bearer ${newToken}`;
};


const getAll=async()=>{
    const {data}= await axios.get(baseUrl);

    return data;
};

const getOne = async(id:string)=>{
    const {data}= await axios.get(`${baseUrl}/${id}`);
    return data;
};

const createNewEmployee = async(object:NewEmployeeForm)=>{
    const {data}=await axios.post(baseUrl,object);
    return data;
};

const updatePassword= async(id:string,object:updatePasswordForm)=>{
    const {data}=await axios.patch(`${baseUrl}/${id}/password`,object);
    return data;
};

const updateDetails = async(id:string, object:UpdateEmployeeForm)=>{
    const {data}=await axios.patch(`${baseUrl}/${id}/details`,object);
    return data;
};

const deleteEmployee = async (id:string)=>{
    const {data}= await axios.delete(`${baseUrl}/${id}`);
    return data;
};




export default {setToken,getAll,getOne,createNewEmployee,updatePassword,updateDetails,deleteEmployee};
