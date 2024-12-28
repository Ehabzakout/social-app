'use client'
import { useFormik } from "formik";
import * as yup from "yup"
import "@fortawesome/fontawesome-free/css/all.min.css"
import { Container } from "@mui/material";
import styles from "../signup/signup.module.css"
import { userLogin } from "@/interfaces/page";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { actions } from "@/lib/features/userslice";
import { useDispatch } from "react-redux";

export default function Login (){
  const Router =useRouter()
  const [check,setcheck]=useState("")
      const passRole =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/;
     
      const schema = yup.object({
        email: yup.string().email("Enter vaild E-mail").required("Required"),
        password: yup
          .string()
          .min(8, "your password should be more thane 8")
          .matches(
            passRole,
            "your password should have number and small &big& special charachters "
          )
          .required("Required"),
       
      });
      const {setToken}=actions
      const dispatch=useDispatch()
 async function onSubmit(values:userLogin) {
  try{  const { data } = await axios.request({
      method: "POST",
      url: "https://linked-posts.routemisr.com/users/signin",
      data:values
    });
if(check==="check"){
    localStorage.setItem("token",data.token)
    sessionStorage.removeItem("token")
}
else if(check === ""){
    localStorage.removeItem("token");
    sessionStorage.setItem("token",data.token)
}
toast.success("Wellcome")
dispatch(setToken(data.token))
setTimeout(() => Router.push("/"),1000);

 }catch(error){
  console.log(error)
    toast.error("your email or password is wrong")
 }}
    const {
      errors,
      handleBlur,
      handleChange,
      handleSubmit,
      touched,
      isSubmitting,
    } = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: schema,
      onSubmit,
    });
    return (
      <>
        <Container>
          <div className="flex items-center mt-20 w-1/2 mx-auto">
            <i className="fa-regular fa-circle-user fa-2x text-primary"></i>
            <span className="text-primary text-lg font-bold ml-1">
              : Login:
            </span>
          </div>
          <div className={`${styles.form} w-1/2 mx-auto`}>
            <form onSubmit={handleSubmit}>
             
              <div className={`${styles.input}`}>
                <label form="email">E-mail</label>
                <input
                  type="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="email"
                  placeholder="E-mail..."
                  className={
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-primary"
                  }
                ></input>
                {errors.email && touched.email ? <p>* {errors.email}</p> : ""}
              </div>
              <div className={`${styles.input}`}>
                <label form="password">Password</label>
                <input
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="password"
                  placeholder="Password..."
                  className={
                    errors.password && touched.password
                      ? "border-red-500"
                      : "border-primary"
                  }
                ></input>
                {errors.password && touched.password ? (
                  <p>* {errors.password}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="flex items-center">
                <input className="radio mr-3" type="checkbox" id="check" onChange={()=>{if(check==="")setcheck("check");else setcheck("")}}></input>
                <label htmlFor="check">Remember me </label>
              </div>
              <button className="btn" type="submit" disabled={isSubmitting}>
                Login
              </button>
            </form>
          </div>
        </Container>
      </>
    );
}