import {create} from "zustand";
import { devtools } from "zustand/middleware";

interface typeState{
    typeDetails:Record<string,unknown>
    setField: (field:string,value:unknown)=>void
}

export const useTypeStore= create<typeState>()(devtools((set)=>({
    typeDetails:{},
    setField: (field, value) =>
    set((state) => ({
      typeDetails: { ...state.typeDetails, [field]: value },
    }))
})));

