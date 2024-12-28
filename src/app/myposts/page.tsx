'use client'
import Loading from "@/_components/loading";
import { userData } from "@/lib/features/userslice";
import { AppStore } from "@/lib/store";
import { Container } from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { number } from "yup";

export default function MyPosts(){
    const {token}=useSelector((store:AppStore)=>store.userReducer)
    const [myPosts,setPost]=useState(null)
const {user}=jwtDecode(token)
async function getMyPosts(){
try{const { data } = await axios.request({
  method: "GET",
  url: `https://linked-posts.routemisr.com/users/${user}/posts?limit=2`,headers:{token}
});
setPost(data.posts)
console.log(data.posts)
return data.posts
}catch (error){
    console.log(user)
    console.log(error)
}
}
useEffect(()=>{getMyPosts()},[])
    return (
      <>
        {myPosts ? (
          myPosts.length === 0 ? (
            <Container>
              <div className="bg-gray-100 flex justify-center items-center w-1/2 rounded-lg h-32 mx-auto mt-20">
                <div className="">
                  <h1 className="font-semibold text-primary my-3 text-sm">You haven't share any post</h1>
                  <Link href={"/createpost"} className="btn block px-3 mx-auto w-fit">Create your First Post</Link>
                </div>
              </div>
            </Container>
          ) : (
            <h1>map</h1>
          )
        ) : (
          <div className="flex h-screen justify-center">
            <Loading />
          </div>
        )}
      </>
    );
}