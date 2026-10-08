import { useState,ChangeEvent } from "react";
export const useField = (type:string,initValue:string="") => {
  const [value, setValue] = useState(initValue);

  const onChange = (event:ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const reset = ()=>{
    setValue("");
  };

  return {
    reset,
    type,
    value,
    onChange,
    
  };
};
