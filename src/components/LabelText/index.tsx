import axios from "@/axios";
import s from "./LabelText.module.scss";
import { useEffect, useState } from "react";



const LabelText: React.FC = () => {

  const [version,setVersion] = useState()
 
  const getVersion = async () => {
    try {
     const res = await axios.get("/version")
    
     if (res.data) {
      setVersion(res.data.version);

     }
    } catch (error) {
      
    }
      }

useEffect(()=>{
  getVersion()
},[])

  return (
    <p className={s.labelText}>
        Система управления активами pultik.me, version: {version}        
    </p>
  )
}

export default LabelText