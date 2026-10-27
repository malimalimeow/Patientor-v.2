import apiClient from "./apiClient"

const baseUrl="/api/diagnoses";

const getAll=async()=>{
    const {data}= await apiClient.get(baseUrl);

    return data;
};

export default {getAll};