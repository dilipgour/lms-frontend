import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Trash , Loader2 } from "lucide-react"
import { ConfirmModal } from "@/components/modals/confirm-modal"
import {useNavigate} from "react-router-dom"

import axios from "axios"
import toast from "react-hot-toast";

export const ChapterActions = ({ courseId , chapterId , isPublished , disabled, setChapter}) => {
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const navigate = useNavigate()  
  
  const onDelete = async ()=>{
    
    try{
      setIsDeleting(true)
      await axios.delete(`/api/courses/${courseId}/chapter/${chapterId}`)
      toast.success("chapter deleted")
      navigate(-1)
      
       }catch{
      toast.error("something went wrong")
    }finally{
      setIsDeleting(false)
    }
    
  }
  
  const onClick = async ()=>{
    try{
      setIsPublishing(true)
      if(isPublished){
        
  const { data } = await axios.patch(`/api/courses/${courseId}/chapter/${chapterId}/unpublish`)
      toast.success("chapter unpublished")
      setChapter(data);
      }else{
       const { data } = await axios.patch(`/api/courses/${courseId}/chapter/${chapterId}/publish`)
      toast.success("chapter published")
     setChapter(data)
      }
       }catch{
         
      toast.error("something went wrong")
    }finally{
      setIsPublishing(false)
    }
    
  }
  
  
  return (
    <div className= "flex items-center gap-x-2">
      <Button 
      onClick={onClick}
      variant = "outline"
      size= "sm"
      disabled={disabled||isPublishing}
      >{ isPublished ? "Unpublish" : "Publish"}</Button>
      
      <ConfirmModal onConfirm={onDelete}>
        <Button 
          size= "sm"
          disabled={isDeleting||isPublishing}
          
      >
        {!isDeleting ? (<Trash className="h-4 w-4"/>)
        : (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
      </>)
        }
      </Button>
      </ConfirmModal>
    </div>
  )
}

