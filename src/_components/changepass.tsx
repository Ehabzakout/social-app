'use client'


import { AppStore } from "@/lib/store";
import axios from "axios";
import { useFormik } from "formik"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import * as yup from "yup"
export default function ChangePass(){
   const{token} =useSelector((store:AppStore)=>store.userReducer)
   const Router=useRouter()
    const passRole =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/;
     
    const basic = yup.object({
      password: yup
        .string()
        .min(8, "incorrect password")
        .matches(passRole, "incorrect password").required("Required"),
       newPassword:yup.string().min(8,"your password should be more thane 8 char").matches(passRole,"your password should have big &small & special char").required("Required")
    });
   async function onSubmit(values){
       try{ const { data } = await axios.request({
          method: "PATCH",
          url: "https://linked-posts.routemisr.com/users/change-password",
        headers:{token},
        data:values
        });
        toast.success("your password has changed")
        setTimeout(() => {localStorage.removeItem("token");
            sessionStorage.removeItem('token');
            Router.push("/login")
        }, 2000);

        return data}catch(error){
            console.log(error)
            console.log(token)
            toast.error("your password didn't change")
        }
    }
    const {touched,handleChange,handleBlur,handleSubmit,errors} = useFormik({
      initialValues: {
        password: "",
        newPassword:"",
      },
    onSubmit,
    validationSchema:basic
    });
    return (
      <>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="text-primary" htmlFor="password">Password</label>
              <input
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                name="password"
                placeholder="Old Password"
                className={
                  errors.password && touched.password
                    ? "border-red-500"
                    : "border-primary"
                }
              ></input>
              {errors.password && touched.password ? (
                <p className="text-red-500">* {errors.password}</p>
              ) : (
                ""
              )}
            </div>
            <div>
              <label className="text-primary" htmlFor="password">
                New Password
              </label>
              <input
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                name="newPassword"
                placeholder="New Password"
                className={
                  errors.newPassword && touched.newPassword
                    ? "border-red-500"
                    : "border-primary"
                }
              ></input>
              {errors.newPassword && touched.newPassword ? (
                <p className="text-red-500">* {errors.newPassword}</p>
              ) : (
                ""
              )}
            </div>
            <button className="btn" type="submit">
              Change My Password
            </button>
          </form>
        </div>
      </>
    );
}