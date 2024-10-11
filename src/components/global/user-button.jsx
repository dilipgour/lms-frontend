import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useNavigate } from 'react-router-dom'
import axios from "axios"
import {  useAuthcontext } from "@/context/Authcontext" 

export default function Userbutton() {
  const {authUser,setAuthuser}= useAuthcontext()
  const navigate = useNavigate()
  //console.log(authUser.name)
  const handleLogout = async()=>{
    await axios.post('/api/auth/logout')
    localStorage.clear()
    setAuthuser(null)
    navigate('/auth/login')
    
  }
  
  return (
 <Popover>
   <PopoverTrigger>
      <Avatar>
  <AvatarImage src="https://github.comh/shadcn.png" />
  <AvatarFallback className="text-white bg-black">{authUser?.name.charAt(0).toUpperCase()}</AvatarFallback>
</Avatar>
<PopoverContent className="w-[200px] bg-white border-none">
<li className="list-none" onClick={handleLogout}>logout</li>
</PopoverContent>
   </PopoverTrigger>
 </Popover>
  )
}