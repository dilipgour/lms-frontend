import { CourseCard } from "@/components/coursecomponents/course-card"

export const CoursesList = ({courses}) => {
  return (
    <div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2">
        {
          courses.length>0&&courses.map((course)=>(
           <CourseCard
           key={course.id}
           courseId={course.id}
           title={course.title}
           price={course.price}
           category={course.categories}
           thumbnail={course.imageUrl}
           />
          ))
        }
       
      </div>
      {
        courses.length==0&&(
        <div className="text-center mt-20 text-muted-foreground text-sm">
          No course found
        </div>
        )
      }
    </div>
  )
}