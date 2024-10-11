import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Loader2, CirclePlus, File ,X} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { MultiFileDropzone } from '@/components/uploader/multi-file-uploader';
import { useEdgeStore } from '@/lib/edgestore';


const formSchema = z.object({
  imageUrl: z.string().min(2, {
    message: "image is required",
  }),
});

export const AttatchmentForm = ({ courseId,initialdata }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attatchent: initialdata || [],
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const [isEditing, setisEditing] = useState(false);
  const [fileStates, setFileStates] = useState([]);
  const [deletingId, setDeletingId] = useState(null)
  const { edgestore } = useEdgeStore();

  const navigate = useNavigate();

  const toggleEdit = () => {
    setisEditing((current) => !current);
  };
  
  const onSubmit = async (values) => {
    console.log("values")
    try {
      const { data } = await axios.post(
        `/api/courses/${courseId}/attachment`,
        values
      );
    } catch (e){
      console.log(e)
      toast.error("something went wrong");
    }
  };
  
  const onDelete = async(id)=>{
    setDeletingId(id)
    
    try{
      await axios.delete(`/api/courses/${courseId}/attachment/${id}`)
      
      navigate(0);
     toast.success("Attatchment deleted");
    }catch(e){
      console.log(e)
      toast.error("something went wrong");
    }
  }
  
  
  function updateFileProgress(key, progress) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }
  
 async function onFilesAdded(addedFiles){
          setFileStates([...fileStates, ...addedFiles]);
          await Promise.all(
            addedFiles.map(async (addedFileState) => {
              try {
                const res = await edgestore.publicFiles.upload({
                  file: addedFileState.file,
                  onProgressChange: async (progress) => {
                    updateFileProgress(addedFileState.key, progress);
                    if (progress === 100) {
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      updateFileProgress(addedFileState.key, 'COMPLETE');
                    }
                  },
                });
              await onSubmit(res)
                console.log(res);
              } catch (err) {
                updateFileProgress(addedFileState.key, 'ERROR');
              }
            }),
          );
          toggleEdit();
      navigate(0);
     toast.success("Course updated");
        }

  return (
    <div className="bg-slate-100 rounded-md flex p-4 mt-6 flex-col">
      <div className="flex justify-between items-center font-medium w-full">
        <p>Course Attatchment</p>
        <Button variant="ghost" onClick={toggleEdit}>
          {!isEditing && !initialdata && (
            <>
              <CirclePlus className="h-4 w-4 mr-2" />
              Add an attatchment
            </>
          )}
          {!isEditing && initialdata && (
            <>
   <CirclePlus className="h-4 w-4 mr-2" />
              Add an attatchment
            </>
          )}
          {isEditing && <>Cancel</>}
        </Button>
      </div>
      {!isEditing && !initialdata.length && (
        <div className="flex justify-center items-center h-60 rounded-md bg-slate-200">
          <File className="h-10 w-10 text-slate-500" />
        </div>
      )}
      {!isEditing && initialdata && (
        <div className="space-y-2">
          { initialdata.map((attatchment)=>(
          <div className="flex items-center bg-sky-100 border-sky-200 border rounded-md p-3 w-full text-sky-700 ">
            <File className="h-4 w-4 mr-2"/>
          <p className="text-sm  truncate">{attatchment.id}</p>
{deletingId == attatchment.id ?
<div className="ml-4">
  <Loader2 className="h-4 w-4 animate-spin"/>
</div> : <div className="ml-4">
  <X className="h-4 w-4 " onClick={()=>{onDelete(attatchment.id)}}/>
</div>}
          </div>))}
        </div>
      )}

      {isEditing && (
        <div>
          <MultiFileDropzone
        value={fileStates}
        onChange={(files) => {
          setFileStates(files);
        }}
        onFilesAdded={onFilesAdded}
      />
        
        </div>
      )}
    </div>
  );
};








