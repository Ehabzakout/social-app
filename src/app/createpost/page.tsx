'use client'
import ImageUpload from "@/_components/image-upload";
import { AppStore } from "@/lib/store";
import "@fortawesome/fontawesome-free/css/all.min.css"
import { useSelector } from "react-redux";
export default function CreatePost (){
let inputValue:string=""
const { image } = useSelector((store: AppStore) => store.postSlice);
    return (
      <>
        <div className="w-1/2 mx-auto mt-20">
          <p className="font-semibold text-primary">
            <i className="fa-brands fa-usps fa-2x"></i> Write Here:
          </p>
          <input className="border-primary" onChange={(e)=>{inputValue=e.target.value;console.log(inputValue)}}></input>
          <ImageUpload></ImageUpload>
        <button className="btn mx-auto" onClick={()=>{if(inputValue !==''&& image ){console.log(image)}}}>Create Post</button>
        </div>
      </>
    );
}