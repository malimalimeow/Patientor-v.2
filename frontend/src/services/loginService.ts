import axios from "axios";

import { loginForm} from "../types";

const baseUrl="/api/login";

let token:string|null = null;

const setToken = (newToken:string) => {
    
  token = `Bearer ${newToken}`;
};

const validation =async()=>{
const config = {
    headers: { Authorization: token },
  };

    const {data}= await axios.get(`${baseUrl}/auth`,config);

    return data;
};


const toLogin = async(object:loginForm)=>{
    const {data}= await axios.post(baseUrl,object);

    return data;
};

export default {toLogin,setToken,validation};