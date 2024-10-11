import { Menu} from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {CourseSidebar} from './course-sidebar'


export default function CourseMobileSidebar ({course,isLoading}) {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden transition hover:opacity-10">
        <Menu/>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <CourseSidebar course={course} isLoading={isLoading}/>
      </SheetContent>
      
    </Sheet>

  )
}