import {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {  useAuthcontext } from "@/context/Authcontext"
import  { Toaster } from 'react-hot-toast';

import RootLayout from "@/layouts/rootlayout";
import AuthLayout from "@/layouts/authlayout";
import CourseLayout from "@/layouts/courselayout";
import HomePage from "@/pages/Home";
import Search from "@/pages/Search/Search"
import Login from "@/pages/Auth/login";
import Signup from "@/pages/Auth/signup";
import Courses from "@/pages/Teacher/Courses"
import Analytics from "@/pages/Teacher/Analytics"
import CreateCoursepage from "@/pages/Teacher/CreateCoursepage"
import EditCoursepage from "@/pages/Teacher/EditCoursepage"
import EditChapterpage from "@/pages/Teacher/EditChapterpage"
import CourseIdPage from "@/pages/Chapter/CourseIdPage"
import ChapterIdPage from "@/pages/Chapter/ChapterIdPage"

const App = () => {
  const {authUser,setAuthuser}= useAuthcontext()
  
  useEffect(() => {
  if(!document.cookie.includes('accessToken')){
    setAuthuser(null)
    localStorage.clear()
  }
  }, [])
  
    return (
      <Router>
           <Routes>
  <Route path="/" element={<RootLayout authUser={authUser} />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<Search />} />
        <Route path="teacher/courses" element={<Courses/>}/>
        <Route path="teacher/courses/create" element={<CreateCoursepage/>}/>
        <Route path = "teacher/courses/:courseId" element={<EditCoursepage/>}/>
        <Route path = "teacher/courses/:courseId/chapters/:chapterId" element={<EditChapterpage/>}/>
        <Route path="teacher/analytics" element={<Analytics/>}/>
  </Route>

      <Route path="/auth" element={<AuthLayout authUser={authUser}  />}>
      <Route path="login" element={<Login />} />
       <Route path="signup" element={<Signup />} />
                </Route>
                
      <Route path="/courses/:courseId" element={<CourseLayout authUser={authUser}  />}>
         <Route index element={<CourseIdPage/>} />
         <Route path='chapters/:chapterId' element={<ChapterIdPage/>} />
        </Route>  
                
                
                <Route path="*" element={<div className="h-full w-full flex items-center justify-center">
                  404 not found
                </div>} />
            </Routes>
<Toaster/>
        </Router>
    );
};

export default App;
