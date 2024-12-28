
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const userData= createAsyncThunk('user/userData',async ()=>{
  const response = await fetch("https://linked-posts.routemisr.com/users/profile-data",{method:"GET",headers:{token:localStorage.getItem("token")!==null?localStorage.getItem("token"):sessionStorage.getItem("token")!==null?sessionStorage.getItem("token"):null}})
const data =await response.json()
return data
}
)

const user = createSlice({
  name: "user",
  initialState: {
    token:localStorage.getItem("token")!==null?localStorage.getItem("token"):sessionStorage.getItem("token")!==null?sessionStorage.getItem("token"):null,
    error:null,
    name:null,
    email: null,
    dateOfBirth: null,
    gender: null,
    photo: null,
    createdAt:null,
    _id:null,
  },
  reducers: {
    setToken:(state,action)=>{state.token=action.payload},
  },
 extraReducers: function(builder){
  builder.addCase(userData.fulfilled,function(state,action){
    const { name, email, dateOfBirth, gender, photo, createdAt,_id } =
      action.payload.user;
state.name=name
state.email=email
state.dateOfBirth=dateOfBirth
state.gender=gender
state.photo=photo
state.createdAt=createdAt
state._id=_id
  })

 }
});
export default user.reducer
export const actions= user.actions