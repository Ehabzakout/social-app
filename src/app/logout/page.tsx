'use client'

import { actions } from "@/lib/features/userslice"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"

export default function Logout(){
    const Router=useRouter()
    const Dispatch=useDispatch()
    const {setToken}=actions
    Dispatch(setToken(null))
    
    if(localStorage.getItem("token")){
    localStorage.removeItem("token")}
    else 
    sessionStorage.removeItem("token");
Router.push("/login")
return <></>
}