import axios from "axios";

import { loginForm} from "../types";

const baseUrl="/api/login";


const validation =async(token:string)=>{
const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

    const {data}= await axios.get(`${baseUrl}/auth`,config);

    return data;
};


const toLogin = async(object:loginForm)=>{
    const {data}= await axios.post(baseUrl,object);

    return data;
};

export default {toLogin,validation};