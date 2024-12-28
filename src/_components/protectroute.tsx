"use client";
import { AppStore } from "@/lib/store";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function ProtectRoute({children}:{children:React.ReactDOM}) {
   const Router= useRouter()
  const { token } = useSelector((store: AppStore) => store.userReducer);
  if (token) {
        try {const {user}=jwtDecode(token)
        return children
        }
        catch(error){
            toast.error("Error Login")
            Router.push("/login")
        }
    }
    else 
    return Router.push("/login");
    
  }

