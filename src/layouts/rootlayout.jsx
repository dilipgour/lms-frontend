import Sidebar from "@/components/sidebar/Sidebar"
import Navbar from "@/components/navbar/navbar"
import { Outlet,Navigate } from 'react-router-dom';

const RootLayout = ({authUser}) => {
  
  return (
    <div className="h-full">
      <div className="h-[80px] w-full md:pl-56 fixed inset-y-0  bg-white z-50">
        <Navbar/>
      </div>
      <div className="w-56 hidden md:flex inset-y-0 fixed h-full flex-col z-50">
        <Sidebar/>
      </div>
      <main className="md:pl-56 h-full pt-[80px]">
       {authUser?<Outlet />:<Navigate to="/auth/login"/>}
      </main>
      
    </div>
  );
};

export default RootLayout;
