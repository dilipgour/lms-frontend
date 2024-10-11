
import { useState, useEffect } from "react";

export const useDebaunce = ( value , delay) => {
  const [debauncedValue, setDebauncedValue] = useState("");
  useEffect(() => {
    
    const t = setTimeout(()=>{
      setDebauncedValue(value)
    },delay||500)
    
    return () => {
  clearTimeout(t)
    }
  },[delay,value])
  
  return debauncedValue
  
};
