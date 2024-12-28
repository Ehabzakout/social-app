'use client'

import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

export default function Comment({commentInfo}) {
  let {id,token}=commentInfo
const [add,setAdd]=React.useState(null)
let inputValue=''
async function createComment(content,post,tok){
  const { data } = await axios.request({
    method: "POST",
    url: "https://linked-posts.routemisr.com/comments",headers:{token:tok},data:{content,post}
  });
  return data
}
  return (
    <>
      <div className="flex gap-2 w-full mr-3  items-center">
        <input
        
          className={`${
            add === "show" ? "block w-3/4" : " hidden"
          } transition duration-500 border border-primary h-6`}
          placeholder="Write Comment..."
          onChange={(e) => {
            inputValue = e.target.value;
            
          }}
        ></input>
        <button
          className={`add ${add ? "" : "w-full"}`}
          onClick={() => {
            if (add === null) setAdd("show");
            else{
              if(inputValue !=='')
                {createComment(inputValue,id,token);
                inputValue=''
                setAdd(null); 
               return toast.success("you has been added")} 
               else
                 setAdd(null);
               return  toast.error("your comment is empty")
              }
          }}
        >
          {add ? "Add" : "Add Comment"}
        </button>
      </div>
    </>
  );
}
