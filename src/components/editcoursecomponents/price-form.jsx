import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Pencil, Loader2} from "lucide-react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {formatPrice} from "@/lib/format";
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
import toast from "react-hot-toast";
import axios from "axios";
import {zodResolver} from "@hookform/resolvers/zod";

const formSchema = z.object({
  price: z.coerce.number(),
});

export const PriceForm = ({initialdata}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialdata?.price || undefined,
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
        <p>Course price</p>
        <Button variant="ghost" onClick={toggleEdit}>
          {!isEditing ? (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit price
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      {!isEditing && initialdata?.price && (
        <p className="text-sm mt-2  ">{formatPrice(initialdata.price)}</p>
      )}
      {!isEditing && !initialdata?.price && (
        <p className="text-sm mt-2 italic">No price</p>
      )}
      {isEditing && (
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="price"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      type="number"
                      step="0.01"
                      placeholder="set price for your course"
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
