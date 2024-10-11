import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { DataTable } from "@/components/coursecomponents/data-table"
import { columns } from "@/components/coursecomponents/columns"
import { useState, useEffect } from "react";
import axios from 'axios'
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react"
 const Courses = () => {
   
   const navigate = useNavigate()
   const [courses, setCourses] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   
  useEffect(() => {
    
    const getCourses = async()=>{
      try{
      const { data } = await axios.get('/api/courses/getAll')
      
      setCourses(data)
    }catch{
      toast.error("something went wrong")
    }finally{
      setIsLoading(false)
    }
    }
    getCourses()
  }, []);
   
   
   if(isLoading){
     return(
       <div className="h-full w-full flex justify-center items-center">
         <Loader2 className="h-8 w-8 animate-spin"/>
       </div>
       )
   }
  return (
    
      
         <div className="p-4">
       
        <DataTable 
        columns={columns}
        data = {courses}
        />
      </div>
    
      
  )
}

export default Courses