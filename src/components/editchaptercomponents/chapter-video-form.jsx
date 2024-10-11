import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Pencil, 
  Loader2, 
  CirclePlus,
  Video 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useEdgeStore } from "@/lib/edgestore"
import { VideoUploader } from "@/components/uploader/video-uploader"
import MuxPlayer from '@mux/mux-player-react';


  
  



export const ChapterVideoForm = ({ initialdata , courseId , chapterId , setChapter}) => {
   const [file, setFile] = useState(null);
  const { edgestore } = useEdgeStore();
   const [isEditing, setisEditing] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
  
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
       setIsLoading(true)
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
        `/api/courses/${courseId}/chapter/${chapterId}`,
        {videoUrl:url}
      );

      toggleEdit();
      setChapter(data)
      toast.success("Chapter updated");
    } catch {
      toast.error("something went wrong");
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="bg-slate-100 rounded-md flex p-4 mt-6 flex-col">
      <div className="flex justify-between items-center font-medium w-full">
        <p>Chapter Video</p>
        <Button variant="ghost" onClick={toggleEdit}>
          {!isEditing && !initialdata?.chapters.videoUrl && (
            <>
              <CirclePlus className="h-4 w-4 mr-2" />
              Add an video
            </>
          )}
          {!isEditing && initialdata?.chapters.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              change video
            </>
          )}
          {isEditing && <>Cancel</>}
        </Button>
      </div>
      {!isEditing && !initialdata?.chapters.videoUrl && (
        <div className="flex justify-center items-center h-60 rounded-md bg-slate-200">
          <Video className="h-10 w-10 text-slate-500" />
        </div>
      )}
      {!isEditing && initialdata?.chapters.videoUrl && (
        <div className=" relative mt-2 aspect-video ">
          
    <MuxPlayer
      playbackId={initialdata.muxData.playbackId}
      metadata={{
        video_id: "video-id-54321",
        video_title: "Test video title",
        viewer_user_id: "user-id-007",
      }}
    />
        </div>
      )}

      {isEditing && (
        <div>
          <VideoUploader
          className="h-full w-full"
          value={file}
         onChange={(file) => {
          setFile(file);
        }}
        onUpload={handleupload}
        isLoading={isLoading}/>
    
        </div>
      )}
      {!isEditing && initialdata?.chapters.videoUrl && (
        <div className="text-slate-700">
          <p className="text-xs text-muted-foreground">
            videos can take few minutes to process refresh the page if video not shown
          </p>
        </div>
      )}
    </div>
  );
};
