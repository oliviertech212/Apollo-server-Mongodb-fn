
import React, { useEffect, useState } from 'react';
import {BsCheck} from "react-icons/bs"
const Todo = (props:any) => {
  const { todoapp ,handleupdate,darkmode} = props;

  const [isdone,setIsdone]=useState(todoapp.isDone);
  

  const handleclick = (id:string) =>{
    handleupdate(id)
    setIsdone(!isdone)
  }






  return (


    <div>
    <div className='flex h-16 items-center px-3 ' >

     {isdone?(
      <button className='w-5 h-5  rounded-full border  border-brightGray mr-3 flex items-center justify-center text-white '  > 
     <BsCheck />
     </button>
     ):
     (
      <button type="submit" className={`w-5 h-5   rounded-full border border-brightGray mr-3 `} onClick={() => handleclick(todoapp.id)}/>
     )

     }
    <h1 className={`${!isdone? "text-white":"line-through text-brightGray"} ${!darkmode&&' bg-brightGray text-black '}  `}  > {todoapp.description} </h1>
    </div>
    <hr className='text-brightGray h-1'/>

    </div>

  );
};

export default Todo;