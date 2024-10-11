import NavbarRoutes  from './navbar-routes'
import CourseMobileSidebar from "@/components/sidebar/course-mobile-sidebar"

export const CourseNavbar = ({course,isLoading}) => {
  return (
     <div className="h-full w-full border-b p-6 flex items-center justify-between">
     <CourseMobileSidebar course={course} isLoading={isLoading} />
      <NavbarRoutes/>
    </div>
  )
}