import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthcontext } from "@/context/Authcontext"


export default function useSignup() {
    const emailregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const [isloading,setIsloading] = useState(false)
    const [error,setError] = useState(null)
    const navigate = useNavigate()
    const { setAuthuser } = useAuthcontext()

    const signup = async(name,email,password)=>{
    
        if(!email||!password||!name){
         return setError("please fill all fields")
        }

        if(!emailregex.test(email)){
            return setError("Invalid email")
        }
        if(password.length<5){
            return setError("password is too short")
        }

        try {
            setIsloading(true)

      const {data} = await axios.post("/api/auth/signup",{
       name,email,password
     })
     
     localStorage.setItem("lms-user",JSON.stringify(data))
     setAuthuser(data)
     
     navigate("/")

     } catch (error) {
       // alert(JSON.stringify(error))
           
        setError(error.response.data.error)
        }finally{
            setIsloading(false)
        }

    }
  return ({isloading,signup,error})
}