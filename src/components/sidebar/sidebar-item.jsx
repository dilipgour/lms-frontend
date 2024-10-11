import { useLocation,useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils"

export default function SidebarItem({icon:Icon,href,label}) {
  const location = useLocation()
  const navigate = useNavigate()
  const isActive = (location.pathname == '/' && href == '/')||location.pathname==href || location.pathname.startsWith(`${href}/`)
  
  const handleClick =()=>{
    navigate(href)
  }
  return (
    <button type='button' onClick={handleClick} className={cn("flex  items-center gap-x-2 pl-6 text-slate-500 text-sm font-[500] hover:text-slate-400 hover:bg-slate-300/20",isActive&&"text-sky-700 bg-sky-200/20 hover:text-sky-700 hover:bg-sky-200/20")}>
      <div className="flex items-center gap-x-2 py-4 ">
        <Icon size={22} className={
          cn("text-slate-500 hover:text-sky-700",isActive&&"text-sky-700 hover:text-sky-700")
        }/>
        {label}
      </div>
      <div className={cn("ml-auto h-full border-sky-700 border-2 opacity-0",isActive&&"opacity-100")}/>
    </button>
  )
}