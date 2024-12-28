"use client";
import ChangePass from "@/_components/changepass";
import ProtectRoute from "@/_components/protectroute";
import { userData } from "@/lib/features/userslice";
import { AppStore } from "@/lib/store";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Account() {
  <ProtectRoute></ProtectRoute>
  const Dispatch = useDispatch();
  useEffect(() => {
    Dispatch(userData());
  }, []);
  const { name, photo,email,gender,dateOfBirth,createdAt } = useSelector((Store: AppStore) => Store.userReducer);
 const [change,setCh]=useState(null)
  return (
    <>
        <Container>
          {photo ? (
            <img
              src={photo}
              className="w-16 h-16 mt-20 rounded-full object-cover mx-auto"
            ></img>
          ) : (
            <div className="w-16 h-16 mt-10 rounded-full object-cover mx-auto text-white bg-gray-500 flex items-center justify-center text-4xl">
              {name?.split("").slice(0, 1)}
            </div>
          )}
          <div className="w-3/4 mx-auto mt-3 bg-gray-100 rounded-lg px-5">
            <p className="text-primary font-semibold text-sm my-1">
              UserName: <span className="text-gray-600 text-xs">{name}</span>
            </p>
            <p className="text-primary font-semibold text-sm my-1">
              E-mail: <span className="text-gray-600 text-xs">{email}</span>
            </p>
            <p className="text-primary font-semibold text-sm my-1">
              Gender: <span className="text-gray-600 text-xs">{gender}</span>
            </p>
            <p className="text-primary font-semibold text-sm my-1">
              Date of Birth:{" "}
              <span className="text-gray-600 text-xs">{dateOfBirth}</span>
            </p>
            <p className="text-primary font-semibold text-sm my-1">
              Your accout created at:{" "}
              <span className="text-gray-600 text-xs">
                {new Date(createdAt).toLocaleString()}
              </span>
            </p>
          </div>
          <div className="w-3/4 mx-auto mt-3 bg-gray-100 rounded-lg px-5 py-3">
            <p
              className=" bg-gradient-to-r from-primary from-10% to-green-400 text-white w-fit px-3 rounded-md cursor-pointer"
              onClick={() => {
                if (change === null) setCh("change");
                else setCh(null);
              }}
            >
              Change your password
            </p>
            {change ? (
              <div className="mb-3">
                <ChangePass></ChangePass>
              </div>
            ) : (
              ""
            )}
          </div>
        </Container>
    </>
  );
}
