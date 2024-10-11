import { Link,useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import toast from 'react-hot-toast';
import axios from 'axios'





const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
})

  

  export default function CreateCoursepage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })
  
  const {  isSubmitting, isValid } = form.formState
  const navigate = useNavigate()
  const onSubmit = async(values)=>{
    try{
      const { data } = await axios.post('/api/courses',values)
      alert(JSON.stringify(data))
      navigate(`/teacher/courses/${data.id}`)
    }catch(error){
      alert(JSON.stringify(error))
      toast.error("Something went wrong")
    }
  }
  
  
  return (
    <div className="max-w-5xl flex md:justify-center md:items-center mx-auto h-full p-4 flex-col">
      
      <div>
        <h1 className="text-2xl">Name your course</h1>
        <p className= "text-sm font-light"> what will you teach in this course ? don&apos;t worry you can change it latter </p>

          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course title</FormLabel>
              <FormControl>
                <Input disabled={ isSubmitting} placeholder="e.g.'Advanced web developement' " {...field} />
              </FormControl>
              <FormDescription>
                what will you teach in this course
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center space-x-2">
          <Link to="/">
          <Button variant="ghost" type="button">Cancel</Button>
          </Link>
        <Button type="submit" disabled={!isValid||isSubmitting} size="sm">Submit</Button>
        </div>
        
      </form>
    </Form>
  
        </div>
    </div>
  )
}