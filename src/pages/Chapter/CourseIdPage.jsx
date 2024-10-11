import { useOutletContext, Link } from "react-router-dom";
import { BookOpen ,CirclePlay} from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
 

const  CourseIdPage = () => {
  const ctx = useOutletContext();
  return (
    <div className="p-4">
      <div className=" bg-slate-100 shadow-sm rounded-md py-2 px-4">
        <div className="w-full flex items-center justify-center aspect-video">
          <img src={ctx?.course?.imageUrl} 
          className="rounded-md h-full w-full"/>
        </div>
       
        <Badge className=" text-xs bg-sky-700/50 mt-1">
          <BookOpen className="h-4 w-4 mr-2"/>
          {ctx?.chapters?.length} {' '}{ctx?.chapters?.length>1?"Chapters":"Chapter"}
        </Badge>
         <div className="mt-2 mb-1">
          <h1 className=" font-medium">{ctx?.course?.title}</h1>
        </div>
        <div className="mb-2">
          <p className="text-sm text-slate-700">
            {ctx?.course?.description}
          </p>
        </div>
      </div>
      <div className="py-8 px-4 mt-8 bg-gradient-to-r from-gray-700 to-slate-900 border shadow-sm rounded-md text-white">
        <p className="text-xl">Ready to start learning?</p>
        <Link to={`/courses/${ctx?.course?.id}/chapters/${ctx?.chapters?.[0].id}`} className="flex justify-center items-center mt-4">
         <Button>
       start watching <CirclePlay className="h-4 w-4 ml-2"/>
      </Button>
      </Link>
      </div>
     
    </div>
  )
}

export default CourseIdPage