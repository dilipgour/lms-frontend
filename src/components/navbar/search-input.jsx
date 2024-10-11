import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';

import { useDebaunce } from "@/hooks/useDebaunce"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const debauncedValue = useDebaunce(value,1000);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const currentCategoryId = searchParams.get('categoryId')
  
  useEffect(() => {
    if(currentCategoryId){
      setSearchParams({ categoryId:currentCategoryId, title:debauncedValue});
    }else{
      setSearchParams({title:debauncedValue});
    }
    
  }, [debauncedValue,currentCategoryId]);
  
  
  return (
    <div className="relative">
      <Search className="absolute top-3 left-3 h-4 w-4 courser-pointer"/>
      <Input
      onChange={(e)=>{setValue(e.target.value)}}
      value={value}
      className="w-full md:w-[300px] rounded-md text-slate-600 pl-10 bg-slate-200/50"
      placeholder="Search for a course"
      />
    </div>
  )
}