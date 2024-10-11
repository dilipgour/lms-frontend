import { Outlet,useParams, useNavigate,Navigate } from 'react-router-dom';
import { CourseSidebar } from "@/components/sidebar/course-sidebar"
import { CourseNavbar } from "@/components/navbar/course-navbar"

import { useState, useEffect } from "react";
import axios from 'axios'

const CourseLayout = ({authUser}) => {
  const [course, setCourse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { courseId } = useParams()
  const navigate = useNavigate()
  
  useEffect(() => {
    
    const getCourse = async()=>{
      setIsLoading(true)
      try{
      const {data} = await axios.get(`/api/courses/getforstream/${courseId}`)
      
      setCourse(data)
      
      }catch(e){
        
        console.log(e)
        navigate(-1)
        
      }finally{
        setIsLoading(false)
      }
    }
    if(authUser) getCourse()
    
    
  }, []);
  
  return (
    <div className="h-full">
      <div className="h-[80px] fixed md:ml-80  inset-y-0 z-50 w-full ">
        <CourseNavbar course={course} isLoading={isLoading}/>
      </div>
        <div className="h-full fixed w-80 inset-y-0 hidden md:flex flex-col z-50 ">
          <CourseSidebar course={course} isLoading={isLoading}/>
        </div>
      
      <main className="md:pl-80 h-full pt-[80px]">
        {authUser?<Outlet context={course} />:<Navigate to="/auth/login"/>}
      </main>
</div>
  );
};

export default CourseLayout;
