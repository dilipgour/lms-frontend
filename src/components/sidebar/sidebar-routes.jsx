import { Layout,Compass,List , BarChart} from 'lucide-react'
import { useLocation } from "react-router-dom"
import SidebarItem from "./sidebar-item"


const guestRoutes =[
  {
    icon : Layout,
    label : "Dashboard",
    href : "/"
  },
    {
    icon : Compass,
    label : "Browse",
    href : "/search"
  }
  ]

const teacherRoutes =[
  {
    icon : List,
    label : "Courses",
    href : "/teacher/courses"
  },
    {
    icon : BarChart,
    label : "Analytics",
    href : "/teacher/analytics"
  }
  ]

export default function SidebarRoutes() {
  const location = useLocation()
  const isTeacherpage = location.pathname.includes("teacher")
  const routes = isTeacherpage ? teacherRoutes : guestRoutes
  return (
    <div className="flex flex-col w-full">
      { routes.map((e)=>(
      <SidebarItem
      key={e.href}
      icon={e.icon}
      label={e.label}
      href={e.href}
      />
      ))
      
      }
    </div>
  )
}