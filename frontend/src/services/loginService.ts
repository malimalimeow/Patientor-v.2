import axios from "axios";

import { loginForm} from "../types";

const baseUrl="/api/login";


const toLogin = async(object:loginForm)=>{
    const {data}= await axios.post(baseUrl,object);

    return data;
};

export default {toLogin};