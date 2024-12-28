'use client'


import { setImage } from "@/lib/features/postslice";
import { AppStore } from "@/lib/store";
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";


const ImageUpload = ()=>{
  const Dispatch= useDispatch();
  const {image}=useSelector((store:AppStore)=>store.postSlice)
    return <>
<div className="w-1/2 mx-auto flex justify-center mt-4 ">
        {image? (
          <div>
            <Image src={image?.url} width={150} height={700} alt="my photo"></Image>
          </div>
        ) :  
        <UploadDropzone
          appearance={{
            container: {
              width: "180px",
              height: "150px",
              fontSize: "12px",
              padding: "10px",
            },
            label: { fontSize: "10px" },
            button: { fontSize: "12px", backgroundColor: "#1976d2",cursor:"pointer" },
            uploadIcon: { color: "#1976d2" },
          }}
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            Dispatch(setImage(res[0]))
           
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}  
        />}
        </div>
     </>   
}

export default ImageUpload