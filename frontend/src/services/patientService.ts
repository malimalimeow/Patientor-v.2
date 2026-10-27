import apiClient from "./apiClient"
import { Patient, PatientFormValues, Entry , EntryFormValues,UpdatePatientType,UpdateEntryType } from "../types";

const apiBaseUrl = `${apiClient}/api`;

let token:string|null = null;

const setToken = (newToken:string) => {
  token = `Bearer ${newToken}`;
};


const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
 
  const { data } = await apiClient.get<Patient[]>(
    `${apiBaseUrl}/patients`,config
  );

  return data;
};

const getOne =async(id:string)=>{
  const config = {
    headers: { Authorization: token },
  };
  const {data}=await apiClient.get<Patient>(`${apiBaseUrl}/patients/${id}`,config);
  return data;
};

const create = async (object: PatientFormValues) => {
  const config = {
    headers: { Authorization: token },
  };
  const { data } = await apiClient.post<Patient>(
    `${apiBaseUrl}/patients`,
    object,config
  );

  return data;
};

const addEntry =async( id:string,object:EntryFormValues)=>{
  const config = {
    headers: { Authorization: token },
  };
  const{data}=await apiClient.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object,config
  );
  return data;
};

const updatePatient=async( id:string,updateData:UpdatePatientType)=>{
  const config = {
    headers:{ Authorization: token},
  };
  const {data}= await apiClient.patch(`${apiBaseUrl}/patients/${id}`,updateData,config);

  return data;
};

const updateEntry = async(id:string,updateEntryDetails:UpdateEntryType,entryId:string)=>{
  const config = {
    headers: { Authorization: token },
  };
   const {data} = await apiClient.patch<Entry>(
    `${apiBaseUrl}/patients/${id}/entries/${entryId}`,updateEntryDetails,config
  );

  return data;

};

const deleteEntry =async(id:string,entryId:string)=>{
  const config = {
    headers: { Authorization: token },
  };
  const {data} = await apiClient.delete<Entry>(
    `${apiBaseUrl}/patients/${id}/entries/${entryId}`,config
  );
  return data;
};

const deletePatient = async(id:string)=>{
  const config = {
    headers: { Authorization: token },
  };
  const {data} = await apiClient.delete<Patient>(`${apiBaseUrl}/patients/${id}`,config);
  return data;
};

export default {

  setToken,getAll, create,getOne,addEntry,deleteEntry,deletePatient,updatePatient,updateEntry
};

