import { Menu} from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Sidebar from './Sidebar'


export default function MobileSidebar () {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden transition hover:opacity-10">
        <Menu/>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <Sidebar/>
      </SheetContent>
      
    </Sheet>

  )
}