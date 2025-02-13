import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Pencil, Loader2} from "lucide-react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import toast from "react-hot-toast";
import axios from "axios";
import {zodResolver} from "@hookform/resolvers/zod";

const formSchema = z.object({
  description: z.string().min(2, {
    message: "description is required",
  }),
});

export const DescriptionForm = ({initialdata}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialdata?.description || "",
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
        `/api/courses/${initialdata?.id}`,
        values,
      );

      toggleEdit();
      navigate(0);
      toast.success("Course updated");
    } catch {
      toast.error("something went wrong");
    }
  };

  return (
    <div className="bg-slate-100 rounded-md flex p-4 mt-6 flex-col">
      <div className="flex justify-between items-center font-medium w-full">
        <p>Course description</p>
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
      {!isEditing && initialdata?.description && (
      <p className="text-sm mt-2  ">{initialdata.description}</p>
      )}
      {!isEditing && !initialdata?.description && (
        <p className="text-sm mt-2  italic">write your course description</p>
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
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="e.g:'Advanced web developement' "
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
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
