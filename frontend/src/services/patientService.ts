import axios from "axios";
import { Patient, PatientFormValues, Entry , EntryFormValues } from "../types";

const apiBaseUrl = '/api';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getOne =async(id:string)=>{
  const {data}=await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addEntry =async( id:string,object:EntryFormValues)=>{
  const{data}=await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );
  return data;
};

const deleteEntry =async(id:string,entryId:string)=>{
  const {data} = await axios.delete<Entry>(
    `${apiBaseUrl}/patients/${id}/entries/${entryId}`
  );
  return data;
};

const deletePatient = async(id:string)=>{
  const {data} = await axios.delete<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

export default {

  getAll, create,getOne,addEntry,deleteEntry,deletePatient
};

