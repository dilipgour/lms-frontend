import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Pencil, Loader2} from "lucide-react";
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
import { Preview } from "@/components/global/preview"
import { Editor } from "@/components/global/editor"
import toast from "react-hot-toast";
import axios from "axios";
import {zodResolver} from "@hookform/resolvers/zod";

const formSchema = z.object({
  description: z.string().min(2, {
    message: "description is required",
  }),
});

export const ChapterDescriptionForm=({initialdata,courseId,chapterId,setChapter})=> {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialdata.chapters.description || "",
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
        <p>Chapter description</p>
        <Button variant="ghost" onClick={toggleEdit}>
          {!isEditing ? (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit description
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      {!isEditing && initialdata?.chapters?.description && (
       <Preview value={initialdata?.chapters?.description }/>
      )}
      {!isEditing && !initialdata?.chapters?.description && (
        <p className="text-sm mt-2  italic">write your chapter description</p>
      )}
      {isEditing && (
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="description"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Editor
                    {...field}/>
                  </FormControl>
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





  

