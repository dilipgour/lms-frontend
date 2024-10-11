import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Select from "@/components/global/Select";
import toast from "react-hot-toast";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  categoryId: z.string().min(1),
});

export const CategoryForm = ({ initialdata, options }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialdata?.categoryId || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const [isEditing, setisEditing] = useState(false);
  const navigate = useNavigate();

  const toggleEdit = () => {
    setisEditing((current) => !current);
  };
  const selectedOption = options.find(
    (option) => option.value === initialdata.categoryId
  );

  const onSubmit = async (values) => {
    
    try {
      const { data } = await axios.patch(
        `/api/courses/${initialdata?.id}`,
        values
      );

      toggleEdit();
      navigate(0);
      toast.success("Course updated");
    } catch {
      toast.error("something went wrong");
    }
  };
  
  const handleChange=(value)=>{
    console.log(value)
    form.setValue("categoryId",value)
  }

  return (
    <div className="bg-slate-100 rounded-md flex p-4 mt-6 flex-col">
      <div className="flex justify-between items-center font-medium w-full">
        <p>Course category</p>
        <Button variant="ghost" onClick={toggleEdit}>
          {!isEditing ? (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit category
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      {!isEditing && initialdata?.categoryId && (
        <p className="text-sm mt-2  ">{selectedOption.label}</p>
      )}
      {!isEditing && !initialdata?.categoryId && (
        <p className="text-sm mt-2  italic">no category selected</p>
      )}
      {isEditing && (
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                    options={options}
                    value={selectedOption}
                    onChange={handleChange}/>
                   </FormControl>
                </FormItem>
              )}
            ></FormField>
            <div className="flex items-center gap-x-2">
              <Button disabled={ isSubmitting}>
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
