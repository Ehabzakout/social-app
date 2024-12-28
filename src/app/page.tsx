"use client";

import Box from "@mui/material/Box";
import { Grid, Stack } from "@mui/material";
import NestedList from "@/_components/sidelist";
import ProtectRoute from "@/_components/protectroute";
import { userData } from "@/lib/features/userslice";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "@/lib/store";
import { useEffect } from "react";
import { getPosts } from "@/lib/features/postslice";
import Loading from "@/_components/loading";
import PostCard from "@/_components/card";

export default function Home() {
  const {token}=useSelector((store:AppStore)=>store.userReducer)
  const dispatch=useDispatch()
  useEffect(()=>{dispatch(userData())},[])
  useEffect(()=>{dispatch(getPosts())},[])
  const {data}=useSelector((store:AppStore)=>store.postSlice)
 const {name}= useSelector((store:AppStore)=>store.userReducer)
 
  return (
    <>
      <ProtectRoute></ProtectRoute>
      <Grid container>
        <Grid item xs={3}>
          <Box component={"aside"}>
            <NestedList></NestedList>
          </Box>
        </Grid>
        <Grid item xs={9}>
          {data ? (
            <>
              <p className="text-primary font-semibold ml-5 text-lg mt-3">All Posts:</p>
              <div className="flex flex-wrap gap-5 justify-center mt-5">
                {data.map((post) => (
                  <div key={post._id} className="sm:w-full flex  justify-center">
                    <PostCard postInfo={post} token={token}/>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <Stack
              sx={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "90vh",
              }}
            >
              <Loading />
            </Stack>
          )}
        </Grid>
      </Grid>
    </>
  );
}
