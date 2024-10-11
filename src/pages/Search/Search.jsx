import { useEffect,useState } from "react";
import { useSearchParams } from 'react-router-dom';

import axios from "axios"
import { Loader2 } from "lucide-react"
import { useCategories } from "@/hooks/useCategories"
import { CategoryBox } from "@/components/global/category-box"
import { SearchInput } from "@/components/navbar/search-input"
import { SkeletonCard } from "@/components/global/skeleton-card"
import { CoursesList } from "@/components/coursecomponents/courses-list"


export default function Search() {
 const { categories } = useCategories()
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const currentCategoryId = searchParams.get('categoryId')
  const title = searchParams.get('title')
  
  
  useEffect(() => {
    const getCourses = async()=>{
      setIsLoading(true)
      try{
      const {data} = await axios.get('/api/courses/get',{params:{categoryId:currentCategoryId,title}})
      console.log(data)
      setCourses(data)
    }catch(e){
      alert(JSON.stringify(e))
    }finally{
      setIsLoading(false)
    }
    }
    getCourses()
  }, [currentCategoryId,title]);
  
  return (
    <>
      <div className="md:hidden px-2 py-2">
        <SearchInput/>
      </div>
      <div className="p-6 h-full">
    <CategoryBox categories={categories}/> 
    
    { isLoading?(
    [1,2,3,4,5,6].map((item)=>(
    <SkeletonCard/>
    ))
    ):
    (<CoursesList
    courses={courses}
    />)}
     </div>
    </>
    )
}