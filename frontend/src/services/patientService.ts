import axios from "axios";
import { Patient, PatientFormValues, Entry , EntryFormValues } from "../types";

const apiBaseUrl = '/api';

let token:string|null = null;

const setToken = (newToken:string) => {
  token = `Bearer ${newToken}`;
};


const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  console.log(config)
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`,config
  );

  return data;
};

const getOne =async(id:string)=>{
  const config = {
    headers: { Authorization: token },
  };
  const {data}=await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`,config);
  return data;
};

const create = async (object: PatientFormValues) => {
  const config = {
    headers: { Authorization: token },
  };
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object,config
  );

  return data;
};

const addEntry =async( id:string,object:EntryFormValues)=>{
  const config = {
    headers: { Authorization: token },
  };
  const{data}=await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object,config
  );
  return data;
};

const deleteEntry =async(id:string,entryId:string)=>{
  const config = {
    headers: { Authorization: token },
  };
  const {data} = await axios.delete<Entry>(
    `${apiBaseUrl}/patients/${id}/entries/${entryId}`,config
  );
  return data;
};

const deletePatient = async(id:string)=>{
  const config = {
    headers: { Authorization: token },
  };
  const {data} = await axios.delete<Patient>(`${apiBaseUrl}/patients/${id}`,config);
  return data;
};

export default {

  setToken,getAll, create,getOne,addEntry,deleteEntry,deletePatient
};

