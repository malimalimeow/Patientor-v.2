import { create } from "zustand";
import { message } from "../types";

interface notificationState {
    message:message;
    actions:{
        setMessage:(text:string,errorStatus?:boolean)=>void;
        clearMessage:()=>void;
    }
}

export const useNotificationStore = create<notificationState>((set) => ({
  message: {
  message: "",
  isError: true
},
  actions: {
    setMessage: (text:string, errorStatus = true) =>
      set({
        message:
        { message: text, isError: errorStatus }
    }),
    clearMessage: () => set({message: { message: "", isError: true }})
  },
}));

export const useMessage = () => useNotificationStore((state) => state.message);
export const useNotiAction = () =>
  useNotificationStore((state) => state.actions);
