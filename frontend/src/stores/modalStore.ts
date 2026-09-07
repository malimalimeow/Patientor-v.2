import {create } from "zustand";
interface modalState{
    modalOpen:string|null,
    actions:{
        openModal:(value:string)=>void
        closeModal:()=>void
    }
}

export const useModalStore=create<modalState>((set)=>({
    modalOpen:null,
    actions:{
        openModal:(value)=>set({modalOpen:value}),
        closeModal:()=>set({modalOpen:null})
    }
}));

export const useModalOpen=()=>useModalStore((state)=>state.modalOpen);
export const useModalActions=()=>useModalStore((state)=>state.actions);