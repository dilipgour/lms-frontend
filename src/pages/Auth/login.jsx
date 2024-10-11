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
import toast from 'react-hot-toast';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import { LoaderCircle } from 'lucide-react';
import useLogin from "@/hooks/useLogin"

export default function login() {
  const [data, setdata] = useState({email:"",password:""})
  const { login,isloading,error } = useLogin()
  
  
  const handleChange=(e)=>{
    setdata({...data,[e.target.id]:e.target.value})
  }
  const handleSubmit = async(e)=>{
    await login(data.email,data.password)
    
    if(error){
      toast.error(error)
      }}
  
  
  
  return (
    <Card className="w-[400px] shadow-lg">
  <CardHeader>
 <CardTitle className=" text-2xl ">welcome back </CardTitle>
 <CardDescription>Login to your account</CardDescription>
</CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="jhondoe@gmail.com" value={data.email} onChange={handleChange}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="***********" type="password" value={data.password} onChange={handleChange}/>
              
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex  flex-col space-y-4">
      <Button size="lg" onClick={handleSubmit}>{isloading?<LoaderCircle className="animate-spin"/> : "Login"}</Button>
      <p className="self-start">Don't have an account? 
      <Link to='/auth/signup'><span className="underline cursor-pointer pl-2 ">Create a new account</span>
      </Link></p>
      </CardFooter>


    </Card>
  )
}




    