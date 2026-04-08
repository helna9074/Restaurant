
import {loginuser} from "@/types/user"
import { set } from 'zod'
import {create} from 'zustand'

interface AuthStore{
    user:loginuser|null
    setUser:(user:loginuser)=>void;
    LogOut:()=>void
}
export const useAuthStore=create<AuthStore>((set)=>({
    user:null,
    setUser:(user)=>set({user}),
    LogOut:()=>set({user:null})
}))