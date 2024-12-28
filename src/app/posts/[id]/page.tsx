'use client'
import { AppStore } from "@/lib/store"
import { Avatar, Box, Container, Grid } from "@mui/material";
import axios from "axios"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setPost,setComments } from "@/lib/features/postslice";
import Loading from "@/_components/loading";
import Comment from "@/_components/comment";


export default function Post({params}:{params:{id:string}}){
    const [showCom,setShow]=useState(null)
    const Dispatch=useDispatch()
const {token}=useSelector((store:AppStore)=>store.userReducer);
const {post}=useSelector((store:AppStore)=>store.postSlice);
const id = React.use(params).id;
   async function getPost(){
    try{
        const { data } = await axios.request({
      method: "GET",
      url: `https://linked-posts.routemisr.com/posts/${id}`,
      headers: { token },
    });
    Dispatch(setPost(data.post));
    console.log(data.post.comments[0])
    return data.post;
    }catch (error){
        console.log(error)
    }
   }
  useEffect(() => {
     getPost();
   }, []);

   return (
     <>
       {post ? (
         <Container>
           <div className="bg-gray-100 mt-14 w-1/2 rounded-md p-2 mx-auto">
             <Grid container>
               <Grid item>
                 <Avatar src={post.user.photo}></Avatar>
               </Grid>
               <Grid item sx={{ ml: 2 }}>
                 <Box sx={{ fontWeight: "bold" }}>{post.user.name}</Box>
                 <Box sx={{ color: "gray" }}>
                   {new Date(post.createdAt).toLocaleString()}
                 </Box>
               </Grid>
             </Grid>
             <img
               src={post.image}
               className="object-cover my-3 rounded-md"
             ></img>

             <button
               className="btn mt-0"
               onClick={() => {
                 if (showCom) setShow(null);
                 else setShow("show");
               }}
             >
               {showCom ? "Hide comments" : "Show comments"}
             </button>
             {showCom ? (
               <div>
                 {post.comments?.map((comment) => (
                   <div
                     className="w-full p-1 flex my-2 rounded-md bg-gray-200"
                     key={comment._id}
                   >
                     <Avatar src={comment.commentCreator.photo}></Avatar>
                     <div className="ml-2">
                       <h1 className=" mt-1 text-xs font-semibold">
                         {comment.commentCreator.name}
                       </h1>
                       <p>{comment.content}</p>
                     </div>
                     <div className="ms-auto text-gray-500">
                       {new Date(comment.createdAt).toDateString()}
                     </div>
                   </div>
                 ))}
                 <Comment commentInfo={{ token, id }} />
               </div>
             ) : (
               ""
             )}
           </div>
         </Container>
       ) : (
         <div className="flex items-center justify-center h-screen">
           <Loading />
         </div>
       )}
     </>
   );
}