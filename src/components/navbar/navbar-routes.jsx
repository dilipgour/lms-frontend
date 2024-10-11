import UserButton from "@/components/global/user-button"
import { useLocation,Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { SearchInput } from "@/components/navbar/search-input"

export default function NavbarRoutes() {
  const location = useLocation()
  
  const isTeacherpage = location.pathname.startsWith('/teacher')
  const isPlayerpage= location.pathname.startsWith('/chapter')
  const isSearchPage =  location.pathname ===       '/search'
  return (
    <>
      {isSearchPage && (<div className="hidden md:flex">
        <SearchInput/>
           </div>)}
      
    <div className="flex gap-x-2 ml-auto">
      
      {
        isTeacherpage||isPlayerpage ?(
        <Link to="/">
        <Button variant="ghost" size="sm"><LogOut className="h-8 w-8 pr-2"/> Exit </Button>
        </Link>):(
        <Link to="/teacher/courses">
        <Button variant="ghost" size="sm"> Teacher mode </Button>
        </Link>)
      }
        
      
      <UserButton/>
    </div>
    </>
  )
}