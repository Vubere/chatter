import { useState } from "react";
import "@uploadthing/react/styles.css";

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../api/uploadthing/core";
import { isAllOf } from "@reduxjs/toolkit";

export default function ImageUploadButton({fn}: {fn: (images: any[], err?:string) => void}) {
  const [images, setImages] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  if(error){
    fn([], error)
  }
  if(images.length){
    fn(images)
  }

  return (
      <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          alert("Upload Completed");
          if (res) {
            setImages([...images, ...res]);
          }
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          setError(error.message)
        }}
      />
  );
}