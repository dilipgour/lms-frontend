import { CategoryItem } from "@/components/global/category-item"
import { iconCategoryMap } from "@/constants/categories"
import { useCategories } from "@/hooks/useCategories"

export const CategoryBox = ({ categories }) => {
  const { isLoading } = useCategories()
  
  return (
    <div className="flex items-center overflow-x-auto pb-2 gap-x-4">
     {!isLoading&& categories?.map((item)=>{
     const icon = iconCategoryMap[item.name]
    return(  
    <CategoryItem
      key={item.id}
      category={item}
      icon ={icon}
      value={item.id}
        />)
        })}
      {isLoading&& [1,2,3,4,5,6,7,8,9,0].map((elem)=>{
        return <button className="py-4 px-8 flex items-center border border-slate-200 gap-3 rounded-full transition  hover:border-sky-700 bg-slate-200 " />
    
        
      })}
</div>
    )
}