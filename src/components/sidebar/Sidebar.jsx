import Logo from "@/components/navbar/Logo"
import SidebarRoutes from "@/components/sidebar/sidebar-routes"
export default function Sidebar() {
  return (
    <div
    className="h-full flex flex-col border-r bg-white overflow-y-auto shadow-sm">
      <div className="p-6">
        <Logo/>
      </div>
      <div className="flex flex-col w-full h-full">
        <SidebarRoutes/>
      </div>
    </div>
  )
}