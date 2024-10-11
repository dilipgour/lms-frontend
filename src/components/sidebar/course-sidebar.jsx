import { CourseSidebarItem } from '@/components/sidebar/course-sidebar-item'


export const CourseSidebar = ({isLoading,course}) => {
  if(isLoading){
    return (
      <p>loading.......</p>)
  }
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold text-lg">{course?.course?.title}</h1>
      </div>
      <div className="flex flex-col  mt-2 w-full">
        
 {
  course?.chapters?.map((item)=>(
   <CourseSidebarItem
   key={item.id}
   courseId={course.course.id}
   chapterId={item.id}
   chapterTitle={item.title}
   chapterDescription={item.description}
   isLocked={!course.purchases&&!item.isFree}
  />
        ))
}
      </div>
    </div>
  )
}