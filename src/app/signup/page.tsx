"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useFormik } from "formik";
import styles from "./signup.module.css";
import { Container } from "@mui/material";
import * as yup from "yup"
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { userData } from "@/interfaces/page";

export default function SignUp() {
  const Router = useRouter();
  const passRole =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/;
  const dateRole= /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/
  const schema = yup.object({
    name: yup
      .string()
      .min(4, "your name should be more thane 4 char")
      .required("Required"),
    email: yup.string().email("Enter vaild E-mail").required("Required"),
    password: yup
      .string()
      .min(8, "your password should be more thane 8")
      .matches(passRole, "your password should have number and small &big& special charachters ")
      .required("Required"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password", "It dosn't match with your password")])
      .required("Required"),
    dateOfBirth:yup.string().matches(dateRole,"enter your birthdate like example").required("Required"),
    gender:yup.string().required("Required")
  });
  
  async function onSubmit(values:userData){
   try {const { data } = await axios.request({
      method: "POST",
      url: "https://linked-posts.routemisr.com/users/signup",
      data:values
    });
    if(data.message==="success"){
      toast.success("your account has registred")
     Router.push("/login")
    }
    return console.log(data)}
   catch (error){
    toast.error(error.response.data.error)
   }}

  
  const { errors, values, handleBlur, handleChange, handleSubmit, touched,isSubmitting } =
  useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        rePassword: "",
        dateOfBirth: "",
        gender: "",
      },
      validationSchema:schema,
      onSubmit,
    });

  return (
    <>
      <Container>
        <div className="flex items-center mt-20 w-1/2 mx-auto">
          <i className="fa-regular fa-circle-user fa-2x text-primary"></i>
          <span className="text-primary text-lg font-bold ml-1">
            : Register Here
          </span>
        </div>
        <div className={`${styles.form} w-1/2 mx-auto`}>
          <form onSubmit={handleSubmit}>
            <div className={`${styles.input}`}>
              <label form="name">Username</label>
              <input
              value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                name="name"
                placeholder="Enter your name"
                className={
                  errors.name && touched.name
                    ? "border-red-500"
                    : "border-primary"
                }
              ></input>
              {errors.name && touched.name ? <p>* {errors.name}</p> : ""}
            </div>
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
            <div className={`${styles.input}`}>
              <label form="rePassword">Confirm Password</label>
              <input
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                name="rePassword"
                placeholder="Re-password..."
                className={
                  errors.rePassword && touched.rePassword
                    ? "border-red-500"
                    : "border-primary"
                }
              ></input>
              {errors.rePassword && touched.rePassword ? (
                <p>* {errors.rePassword}</p>
              ) : (
                ""
              )}
            </div>
            <div className={`${styles.input}`}>
              <label form="dateOfBirth">Your Birthday</label>
              <input
                onBlur={handleBlur}
                onChange={handleChange}
                name="dateOfBirth"
                placeholder="01/01/2024"
                className={
                  errors.dateOfBirth && touched.dateOfBirth
                    ? "border-red-500"
                    : "border-primary"
                }
              ></input>
              {errors.dateOfBirth && touched.dateOfBirth ? (
                <p>* {errors.dateOfBirth}</p>
              ) : (
                ""
              )}
            </div>
            <div className={`${styles.input}`}>
              <label form="gender">gender</label>
              <div className="flex mt-2">
                <label htmlFor="male">Male</label>
                <input
                  className="radio ml-2"
                  type="radio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="gender"
                  value="male"
                  id="male"
                ></input>
                <input
                  className="radio mr-2 ms-auto"
                  type="radio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="gender"
                  value="female"
                  id="female"
                ></input>
                <label htmlFor="female">Female</label>
              </div>
              {errors.gender && touched.gender? (
                <p>* {errors.gender}</p>
              ) : (
                ""
              )}
            </div>
            <button className="btn" type="submit" disabled={isSubmitting}>
              Sign Up
            </button>
          </form>
        </div>
      </Container>
    </>
  );
}
