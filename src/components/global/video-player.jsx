import { useState } from "react";
import axios from "axios"
import muxPlayer from "@mux/mux-player-react"
import { toast } from "react-hot-toast"
import { Loader2 , Lock } from "lucide-react"
import MuxPlayer from '@mux/mux-player-react';
import { cn } from "@/lib/utils"
export const VideoPlayer = ({
       chapterId,
        courseId,
        title,
        playbackId,
        isLocked,
        nextChapterId
  }) => {
    const [isready, setIsready] = useState(false);
  return (
    <>
      
    <div className="relative aspect-video ">
      {
        !isLocked&&!isready&&(
        <div className="absolute inset-0 flex justify-center items-center bg-slate-300 rounded-md ">
          <Loader2 className="animate-spin h-8 w-8"/>
         
        </div>
        )
      }
      
        {
        isLocked&&(
        <div className="absolute inset-0 flex justify-center items-center bg-slate-300 rounded-md flex-col text-muted-foreground">
          <Lock className="h-8 w-8"/>
           <p className="text-sm">This chapter is locked</p>
        </div>
        )
      }
      {
      !isLocked&&<MuxPlayer
      className={cn(!isready&&"hidden")}
      title={title}
      playbackId={playbackId}
      metadata={{
        video_id: "video-id-54321",
        video_title: "Test video title",
        viewer_user_id: "user-id-007",
      }}
      autoplay={true}
      onCanPlay={()=>{setIsready(true)}}
    />}

      
    </div>

    </>
  )
}