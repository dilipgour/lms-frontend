import axios from "axios";
import {IconBadge} from "@/components/global/icon-badge";
import {useState, useEffect, useMemo} from "react";

import {TitleForm} from "@/components/editcoursecomponents/title-form";
import {DescriptionForm} from "@/components/editcoursecomponents/description-form";
import {ImageForm} from "@/components/editcoursecomponents/image-form";
import {CategoryForm} from "@/components/editcoursecomponents/category-form";
import {PriceForm} from "@/components/editcoursecomponents/price-form";
import {AttatchmentForm} from "@/components/editcoursecomponents/attachment-form";
import {CreateChapterForm} from "@/components/editcoursecomponents/create-chapter";
import { CourseActions } from "@/components/editcoursecomponents/course-actions"
import { Banner } from "@/components/global/banner"

import {useParams, useNavigate} from "react-router-dom";
import {
  LoaderCircle,
  LayoutDashboard,
  ListChecks,
  IndianRupee,
  File,
} from "lucide-react";

export default function EditCoursepage() {
  const {courseId} = useParams();
  const [course, setcourse] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getCourse = async () => {
      try {
        const {data} = await axios.get(`/api/courses/${courseId}`);
        if (data) {
          
          setcourse(data);
          console.log(data)
        }
      } catch (error) {
        navigate("/");
      } finally {
        setisLoading(false);
      }
    };
    getCourse();
  }, [courseId]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const {data} = await axios.get("/api/categories");
        if (data) {
          
          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setIsCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const requiredFieldsMissing = useMemo(() => {
    if (!course || course == {}) return true;
    const requiredFields = [
      course?.course?.title,
      course?.course?.description,
      course?.course?.imageUrl,
      course?.course?.price,
      course?.course?.categoryId,
      course?.chapters?.some((chapter)=> chapter.isPublished)
      
    ];

    return requiredFields.filter((field) => field).length;
  }, [course]);
  
  const totalFields = 6;
  const isCompeleted = totalFields != requiredFieldsMissing

  if (isLoading || isCategoriesLoading) {
    return (
      <div className="h-full w-full flex justify-center items-center ">
        <LoaderCircle className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  return (
    <>  
    {!course?.course.isPublished &&(
     <Banner label="This course is not published yet"/>
    )}
    <div className="p-6 h-full ">
      <div className="flex justify-between items-center ">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course setup</h1>
          <span className="text-sm text-slate-600">
            Compelete all fields {`(${requiredFieldsMissing}/${totalFields})`}
          </span>
        </div>
            <CourseActions
            disabled= {isCompeleted}
            courseId= {courseId}
            isPublished={course?.course.isPublished}
            />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-16 gap-6 ">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize Your Course</h2>
          </div>
          <TitleForm initialdata={course.course} />
          <DescriptionForm initialdata={course.course} />
         <ImageForm initialdata={course.course}/>
          <CategoryForm
            initialdata={course.course}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl">Course Chapters</h2>
            </div>
        <CreateChapterForm initialdata={course.chapters} courseId={course.course.id}/>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={IndianRupee} />
              <h2 className="text-xl">Sell Your Course </h2>
            </div>
            <PriceForm  initialdata={course.course}/>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={File} />
              <h2 className="text-xl">Resourses and Attatchments</h2>
            </div>
            <AttatchmentForm courseId={course.course.id} initialdata={course.attachments}/>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
