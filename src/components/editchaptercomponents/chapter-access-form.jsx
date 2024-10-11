import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Pencil, Loader2} from "lucide-react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import toast from "react-hot-toast";
import axios from "axios";
import {zodResolver} from "@hookform/resolvers/zod";

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

export const ChapterAccessForm = ({initialdata,courseId,chapterId,setChapter})=> {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: initialdata.chapters.isFree,
    },
  });
  const {isSubmitting, isValid} = form.formState;
  const [isEditing, setisEditing] = useState(false);
  const navigate = useNavigate();

  const toggleEdit = () => {
    setisEditing((current) => !current);
  };
  const onSubmit = async (values) => {
    try {
      const {data} = await axios.patch(
        `/api/courses/${courseId}/chapter/${chapterId}`,
        values,
      );

      toggleEdit();
      setChapter(data)
      toast.success("Chapter updated");
    } catch {
      toast.error("something went wrong");
    }
  };

  return (
    <div className="bg-slate-100 rounded-md flex p-4 mt-6 flex-col">
      <div className="flex justify-between items-center font-medium w-full">
        <p>Chapter access</p>
        <Button variant="ghost" onClick={toggleEdit}>
          {!isEditing ? (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Access
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      {!isEditing &&(
      initialdata.chapters.isFree ?(
       <p>This chapter is  free for preview</p>
       ):(
         <p className="italic text-slate-500">This chapter is not free for preview</p>
       )
      
      )}
    
      {isEditing && (
        <Form {...form}>
          <form className="space-y-4" mt-4 onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="isFree"
              render={({field}) => (
                <FormItem className ="flex space-x-3 items-start space-y-0 rounded-md p-4  border ">
                  
                  <FormControl>
                    <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-0">
                    <FormDescription> Check this box if you want to make this chapter free for preview</FormDescription>
                  </div>
                </FormItem>
              )}
            ></FormField>
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="animate-spin h-2 w-2" />
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}