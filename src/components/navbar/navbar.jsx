import MobileSidebar from "@/components/sidebar/mobile-sidebar"
import NavbarRoutes from "./navbar-routes"

export default function Navbar() {
  return (
    <div className="h-full w-full border-b p-6 flex items-center justify-between">
      <MobileSidebar/>
      <NavbarRoutes/>
    </div>
  )
}