import {create } from "zustand"
interface modalState{
    modalOpen:boolean,
    actions:{
        openModal:()=>void
        closeModal:()=>void
    }
}

export const useModalStore=create<modalState>((set)=>({
    modalOpen:false,
    actions:{
        openModal:()=>set({modalOpen:true}),
        closeModal:()=>set({modalOpen:false})
    }
}))

export const useModalOpen=()=>useModalStore((state)=>state.modalOpen)
export const useModalActions=()=>useModalStore((state)=>state.actions)