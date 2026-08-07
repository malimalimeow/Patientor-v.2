import axios from "axios"

const baseUrl="/api/diagnoses"

const getAll=async()=>{
    const {data}= await axios.get(baseUrl)

    return data
}

export default {getAll}