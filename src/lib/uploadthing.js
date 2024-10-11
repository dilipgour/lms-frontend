import { generateUploadDropzone } from "@uploadthing/react";
 
export const UploadDropzone = generateUploadDropzone({
  url: "http://localhost:5000/api/uploadthing",
});