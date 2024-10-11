import { useState, useEffect, useMemo } from "react";
import { 
  useParams, 
  useNavigate,
  Link 
  } from "react-router-dom";
import axios from "axios";
import { 
  Loader2, 
  ArrowLeft, 
  LayoutDashboard, 
  Eye, 
  Video 
  } from "lucide-react";

import { IconBadge } from "@/components/global/icon-badge"
import { Banner } from "@/components/global/banner"

import { ChapterTitleForm } from "@/components/editchaptercomponents/chapter-title-form";
import { ChapterDescriptionForm } from "@/components/editchaptercomponents/chapter-description-form";
import { ChapterAccessForm } from "@/components/editchaptercomponents/chapter-access-form";
import { ChapterVideoForm } from "@/components/editchaptercomponents/chapter-video-form";
import { ChapterActions } from "@/components/editchaptercomponents/chapter-actions";

export default function EditChapterpage() {
  const { courseId, chapterId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [chapter, setChapter] = useState({});

  useEffect(() => {
    const getChapter = async () => {
      try {
        const { data } = await axios.get(
          `/api/courses/${courseId}/chapters/${chapterId}`
        );
        if (data) {
          setChapter(data);
        }
      } catch (error) {
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    getChapter();
  }, [courseId, chapterId]);

  const requiredFieldsMissing = useMemo(() => {
    if (!chapter || chapter == {}) return true;
    const requiredFields = [
      chapter?.chapters?.title,
      chapter?.chapters?.description,
      chapter?.chapters?.videoUrl,
    ];

    return requiredFields.filter((field) => field).length;
  }, [chapter]);
  
  
  const totalFields = 3;
  const isCompeleted = requiredFieldsMissing!==totalFields
  
  if (isLoading) {
    return (
      <div className="h-full w-full flex justify-center items-center ">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  return (
    <> 
    {!chapter?.chapters.isPublished &&(
     <Banner label="This chapter is not published yet"/>
    )}
    <div className="p-6">
       <div className="flex justify-between items-center">
        <div className="w-full">
          <Link
            to={`/teacher/courses/${courseId}`}
            className="flex items-center transition text-sm hover:opacity-75 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to course setup
          </Link>
           
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">Chapter Creation</h1>
              <span className="text-sm text-slate-700">
                Compelete all fields {`${requiredFieldsMissing}/${totalFields}`}
              </span>
            </div>
            <ChapterActions
            disabled= {isCompeleted}
            courseId= {courseId}
            chapterId={chapterId}
            setChapter={setChapter}
            isPublished={chapter.chapters.isPublished}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-16 gap-6">
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Costumize Your Chapter</h2>
            </div>
            <ChapterTitleForm
              initialdata={chapter}
              courseId={courseId}
              chapterId={chapterId}
              setChapter={setChapter}
            />

            <ChapterDescriptionForm
              initialdata={chapter}
              courseId={courseId}
              chapterId={chapterId}
              setChapter={setChapter}
            />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Eye} />
              <h2 className="text-xl">Access Settings</h2>
            </div>
            <ChapterAccessForm
              initialdata={chapter}
              courseId={courseId}
              chapterId={chapterId}
              setChapter={setChapter}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={Video} />
            <h2 className="text-xl">Add a video</h2>
          </div>
          <ChapterVideoForm
          initialdata={chapter}
          courseId={courseId}
          chapterId={chapterId}
          setChapter={setChapter}
              />
        </div>
      </div>
    </div>
     </>
  );
}
