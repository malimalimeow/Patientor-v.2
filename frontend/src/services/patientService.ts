import apiClient from "./apiClient"
import { Patient, PatientFormValues, Entry , EntryFormValues,UpdatePatientType,UpdateEntryType } from "../types";

const apiBaseUrl = "/api/patients";

let token:string|null = null;

const setToken = (newToken:string) => {
  token = `Bearer ${newToken}`;
};


const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
 
  const { data } = await apiClient.get<Patient[]>(
    `${apiBaseUrl}`,config
  );

  return data;
};

const getOne =async(id:string)=>{
  const config = {
    headers: { Authorization: token },
  };
  const {data}=await apiClient.get<Patient>(`${apiBaseUrl}/${id}`,config);
  return data;
};

const create = async (object: PatientFormValues) => {
  const config = {
    headers: { Authorization: token },
  };
  const { data } = await apiClient.post<Patient>(
    `${apiBaseUrl}`,
    object,config
  );

  return data;
};

const addEntry =async( id:string,object:EntryFormValues)=>{
  const config = {
    headers: { Authorization: token },
  };
  const{data}=await apiClient.post<Entry>(
    `${apiBaseUrl}/${id}/entries`,
    object,config
  );
  return data;
};

const updatePatient=async( id:string,updateData:UpdatePatientType)=>{
  const config = {
    headers:{ Authorization: token},
  };
  const {data}= await apiClient.patch(`${apiBaseUrl}/${id}`,updateData,config);

  return data;
};

const updateEntry = async(id:string,updateEntryDetails:UpdateEntryType,entryId:string)=>{
  const config = {
    headers: { Authorization: token },
  };
   const {data} = await apiClient.patch<Entry>(
    `${apiBaseUrl}/${id}/entries/${entryId}`,updateEntryDetails,config
  );

  return data;

};



const deletePatient = async(id:string)=>{
  const config = {
    headers: { Authorization: token },
  };
  const {data} = await apiClient.delete<Patient>(`${apiBaseUrl}/${id}`,config);
  return data;
};

export default {

  setToken,getAll, create,getOne,addEntry,deletePatient,updatePatient,updateEntry
};

