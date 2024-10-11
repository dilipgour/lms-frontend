import { Outlet,useParams, useNavigate } from 'react-router-dom';
 import { useState, useEffect,useMemo } from "react"
 import { Loader2 }  from 'lucide-react'
 import axios from 'axios'
 import { Banner } from "@/components/global/banner"
 import { Separator } from "@/components/ui/separator"
 import { VideoPlayer } from "@/components/global/video-player"
 import { Preview } from "@/components/global/preview"
 import { CourseEnrollButton } from "@/components/global/course-enroll-button"
 
 
export default function ChapterIdPage() {
  const [chapter, setChapter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { courseId,chapterId } = useParams()
  const navigate = useNavigate()
  
  useEffect(() => {
    const getChapter = async ()=>{
      try{
        setIsLoading(true)
      const { data } = await axios.get(`/api/courses/${courseId}/getchapterforstream/${chapterId}`)
      setChapter(data)
      }catch(e){
        alert("error")
      }finally{
        setIsLoading(false)
      }
    }
    if(courseId!=undefined&&chapterId!=undefined){
      getChapter()
    }
    
    
    
}, [courseId,chapterId])

const isLocked= useMemo(() =>{ 
  if(chapter.length<1) return false
return !chapter?.chapter[0]?.isFree&&!chapter?.isPurchased?.length},
[chapter])
 
 
 if(isLoading){
   return <div className="h-full w-full flex items-center justify-center ">
     <Loader2 className="h-4 w-4 animate-spin"/>
   </div>
 }
  
  return (
    <div className="">
     { isLocked&&<Banner
      label="You need to purchase this course to watch this chapter"/>
    }
    <div className="flex flex-col max-w-4xl mx-auto pb-20 ">
      <div className="p-4">
       <VideoPlayer
        chapterId={chapterId}
        courseId={courseId}
        title={chapter.chapter?.[0]?.title}
        isLocked={isLocked}
        playbackId={chapter.muxdata?.[0]?.playbackId||null}
        />
      </div>
      <div>
        <div className="p-4 flex flex-col md:flex-row mb-2 items-center justify-between">
          <h2 className="text-2xl">{chapter?.chapter?.[0]?.title}</h2>
          {
          !chapter?.isPurchased?.length&&(
          <CourseEnrollButton
          courseId={courseId}
          price={chapter?.course?.[0]?.price}
          />
          )}
        </div>
      </div>
      <div>
        <Preview
        value={chapter?.chapter?.[0]?.description}/>
      </div>
      <Separator/>
      {chapter?.chapter?.[0]?.isPurchased&&(
      chapter.courseAttachments.map((item)=>(
      <a href={item.url}
        target="_blank"
        className="p-3 bg-sky-200 text-sky-700"
      >{item.name}</a>

      ))
      )}
    </div>
    
    </div>
  )
}