import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getPosts= createAsyncThunk("posts/getPosts", async ()=>{
    const response = await fetch(
      `https://linked-posts.routemisr.com/posts?limit=50`,
      {
        method: "GET",
        headers: {
          token:
            localStorage.getItem("token") !== null
              ? localStorage.getItem("token")
              : sessionStorage.getItem("token") !== null
              ? sessionStorage.getItem("token")
              : null,
        },
      }
    );
     const data = await response.json();
      return data
})

const postSlice = createSlice({
    name:"posts",
    initialState:{
        data:null,
        isLoading:false,
        isError:false,
        error:null,
        post:null,
       image:null,
    },
    reducers:{
      setPost: (state,action)=>{
        state.post=action.payload;
      },
      setImage:(state,action)=>{
        state.image=action.payload
      }
    },
    extraReducers:function (builder){
        builder.addCase(getPosts.fulfilled,(state,action)=>{
            state.data=action.payload.posts;
        })
    }
})




export default postSlice.reducer
export const {setPost,setImage}=postSlice.actions