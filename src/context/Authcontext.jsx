import React, { createContext, useContext, useState } from 'react'

const Authcontext = createContext()

export const useAuthcontext=()=>{
    return useContext(Authcontext)
}

export default function AuthcontextProvider({children}) {
    const [authUser,setAuthuser]=useState(JSON.parse(localStorage.getItem("lms-user"))||null)
  return (
    <Authcontext.Provider value={{authUser,setAuthuser}}>
        {children}
    </Authcontext.Provider>
  )
}
