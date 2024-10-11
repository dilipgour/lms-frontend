import { useLocation,useNavigate } from 'react-router-dom';
import { LockKeyhole,CirclePlay } from 'lucide-react';
import { cn } from "@/lib/utils"

export const CourseSidebarItem = ({courseId,chapterId,chapterTitle,chapterDescription,isLocked}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const Icon = isLocked ? LockKeyhole : CirclePlay
  const isActive = location?.pathname.includes(chapterId)
  
  const onClick = ()=>{
    navigate(`/courses/${courseId}/chapters/${chapterId}`)
  }
  
  return (
    <div className={cn("flex p-4  bg-slate-100 mx-2 rounded-md items-center mt-4  hover:bg-sky-200 hover:text-sky-600 transition coursor-pointer text-slate-600",
    isActive&&"hover:bg-sky-200 hover:text-sky-600 bg-sky-200 text-sky-600")}
    onClick={onClick}>
      <p className="text-lg">
        {chapterTitle}
      </p>
      <Icon className="h-4 w-4 ml-auto"/>
    </div>
  )
}