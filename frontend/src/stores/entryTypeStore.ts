import {create} from "zustand"
import { devtools } from "zustand/middleware"

interface typeState{
    typeDetails:Record<string,any>
    setField: (field:string,value:any)=>void
}

export const useTypeStore= create<typeState>()(devtools((set)=>({
    typeDetails:{},
    setField: (field, value) =>
    set((state) => ({
      typeDetails: { ...state.typeDetails, [field]: value },
    }))
})))

