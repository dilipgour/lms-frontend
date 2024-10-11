import { useState } from "react";
import { Link } from "react-router-dom"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import toast from 'react-hot-toast';
import { LoaderCircle } from 'lucide-react';
import useSignup from "@/hooks/useSignup"


export default function Signup() {
  const [data, setdata] = useState({name:"",email:"",password:""})
  const { error,signup,isloading } = useSignup()
  
  const handleChange=(e)=>{
    setdata({...data,[e.target.id]:e.target.value})
  }
  const handleSubmit = async (e)=>{
    e.preventDefault()
     await signup(data.name,data.email,data.password)
     if(error){
       toast(error)
     }
  }
  
  
  return (
    <Card className="w-[400px] shadow-lg">
  <CardHeader>
 <CardTitle className=" text-2xl ">Join us</CardTitle>
 <CardDescription>Create a new account </CardDescription>
</CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="jhon doe" onChange={handleChange} />
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="jhondoe@gmail.com" onChange={handleChange}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="***********" type="password" onChange={handleChange}/>
              
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex  flex-col space-y-4">
            <Button size="lg" onClick={handleSubmit}>{isloading?<LoaderCircle className="animate-spin"/> : "Create"}</Button>
      <p className="self-start">Already have an account? 
      <Link to='/auth/login'><span className="underline cursor-pointer pl-2 ">try to login</span>
      </Link></p>
      </CardFooter>


    </Card>
  )
}




    