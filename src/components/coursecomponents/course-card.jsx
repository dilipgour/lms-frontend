import { Link } from "react-router-dom"
import { formatPrice } from "@/lib/format"


export const CourseCard = ({ courseId, title, price, category,thumbnail }) => {
  return (
    <Link to={`/courses/${courseId}`} className="my-4">
      <div className="h-full relative group rounded-lg transition p-3 overflow-hidden border hover:bg-slate-300">
        <div className="aspect-video rounded-md relative overflow-hidden ">
          <img src={thumbnail} alt="thumbnail"
          className="object-cover"/>
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium transition group-hover:text-sky-700 line-clamp-2">
            {title}
          </div>
          <div className="text-xs">
            {category.name}
          </div>
        </div>
        <p className="pt-2 text-md md:sm text-slate-700">
          { formatPrice(price)}
        </p>
      </div>
    </Link>
  )
}