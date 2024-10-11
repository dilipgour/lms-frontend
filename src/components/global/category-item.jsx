import { cn } from "@/lib/utils"
import { useSearchParams } from 'react-router-dom';


export const CategoryItem = ({category, icon:Icon, value}) => {
  const [searchParams, setSearchParams] = useSearchParams();

const handleClick=()=>{
  if(searchParams.get('categoryId')==value){
    setSearchParams({ });
  }else{
  setSearchParams({ categoryId:value });
  }
}
   return (
    <button className={cn("p-2 px-3 flex items-center border border-slate-200 gap-3 rounded-full transition  hover:border-sky-700",searchParams.get('categoryId')==value&&"bg-sky-200 text-sky-700 border-sky-700")}
    onClick={handleClick}>
    <Icon size={20}/>
      <div className="truncate">
        {category.name}
      </div>
    </button>
  )
}