import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Pencil, 
  Loader2, 
  CirclePlus,
  Image 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useEdgeStore } from "@/lib/edgestore"
import { SingleImageDropzone } from "@/components/uploader/single-image-uploader"




export const ImageForm = ({ initialdata }) => {
  
  

  const [file, setFile] = useState(null);
  const { edgestore } = useEdgeStore();
  
  const [isEditing, setisEditing] = useState(false);
  
  const navigate = useNavigate();

  const toggleEdit = () => {
    setisEditing((current) => !current);
    if(file){
      setFile(null)
    }
  };
  const handleupload=async(e)=>{
    e.stopPropagation()

     if (file) {
            const res = await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress) => {
                
                console.log(progress);
              },
            });
          
           await onSubmit(res.url)
          }
          
          
    
  }
  
  const onSubmit = async (url) => {


  
    try {
      const { data } = await axios.patch(
        `/api/courses/${initialdata?.id}`,
        {imageUrl:url}
      );

      toggleEdit();
      navigate(0);
      toast.success("Course updated");
    } catch {
      toast.error("something went wrong");
    }
  };

  return (
    <div className="bg-slate-100 rounded-md flex p-4 mt-6 flex-col">
      <div className="flex justify-between items-center font-medium w-full">
        <p>Course Image</p>
        <Button variant="ghost" onClick={toggleEdit}>
          {!isEditing && !initialdata?.imageUrl && (
            <>
              <CirclePlus className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && initialdata?.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              change image
            </>
          )}
          {isEditing && <>Cancel</>}
        </Button>
      </div>
      {!isEditing && !initialdata?.imageUrl && (
        <div className="flex justify-center items-center h-60 rounded-md bg-slate-200">
          <Image className="h-10 w-10 text-slate-500" />
        </div>
      )}
      {!isEditing && initialdata?.imageUrl && (
        <div className="flex justify-center items-center  aspect-video rounded-md bg-slate-200">
          <img src={initialdata.imageUrl} className="h-full w-full rounded-md"  />
        </div>
      )}

      {isEditing && (
        <div>
          <SingleImageDropzone
          className="h-full w-full"
          value={file}
         onChange={(file) => {
          setFile(file);
        }}
        onUpload={handleupload}/>
    
        </div>
      )}
    </div>
  );
};
