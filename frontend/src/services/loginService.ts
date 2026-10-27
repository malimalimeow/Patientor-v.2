import apiClient from "./apiClient"
import { loginForm} from "../types";

const baseUrl="/api/login";


const validation =async(token:string)=>{
const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

    const {data}= await apiClient.get(`${baseUrl}/auth`,config);

    return data;
};


const toLogin = async(object:loginForm)=>{
    const {data}= await apiClient.post(baseUrl,object);

    return data;
};

export default {toLogin,validation};