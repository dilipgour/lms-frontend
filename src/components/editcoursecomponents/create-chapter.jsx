import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {CirclePlus, Loader2} from "lucide-react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import { ChaptersList } from "./chapters-list"
import toast from "react-hot-toast";
import axios from "axios";
import {zodResolver} from "@hookform/resolvers/zod";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
});

export const CreateChapterForm = ({courseId,initialdata}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: "",
  });
  const {isSubmitting, isValid} = form.formState;
  const [isEditing, setisEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false)
  const navigate = useNavigate();
  const toggleEdit = () => {
    setisEditing((current) => !current);
  };
  
  const onEdit =(id)=>{
    navigate(`/teacher/courses/${courseId}/chapters/${id}`)
  }
  const onSubmit = async (values) => {
    try {
      const {data} = await axios.post(
        `/api/courses/${courseId}/chapters`,
        values,
      );

      toggleEdit();
      navigate(0);
      toast.success("Course updated");
    } catch {
      toast.error("something went wrong");
    }
  };
  const onReorder = async (bulkUpdateData)=>{
    setIsUpdating(true)
    try{
      
    await axios.put(`/api/courses/${courseId}/chapters/reorder`,{list:bulkUpdateData})
    toast.success("Course updated");
    }catch {
      toast.error("something went wrong");
    }finally{
      setIsUpdating(false)
    }
  }
  return (
    <div className="bg-slate-100 rounded-md flex p-4 mt-6 flex-col relative">
      {isUpdating&&(
      <div className="absolute h-full w-full rounded-md flex items-center justify-center bg-slate-700/50 top-0 left-0">
        <Loader2 className="h-6 w-6 animate-spin text-sky-700"/>
      </div>)}
      <div className="flex justify-between items-center font-medium w-full">
        <p>Course chapters</p>
        <Button variant="ghost" onClick={toggleEdit}>
          {!isEditing ? (
            <>
              <CirclePlus className="h-4 w-4 mr-2" />
            Add a chapter
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      {!isEditing && initialdata.length<1 && (
        <p className="text-sm mt-2 font-medium italic ">Add chapters to publish this course</p>
      )} 
      
      {!isEditing && initialdata.length>0 &&(
      <ChaptersList
      initialdata={initialdata}
      onEdit={onEdit}
      onReorder={onReorder}
      />)
      }
      
      { isEditing &&(
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g:'Introduction' "
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="animate-spin h-2 w-2" />
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
     { !isEditing&&(<div>
        <p className="text-sm text-slate-500">Drag and drop to reorder chapters</p>
      </div>)}
    </div>
  );
};
