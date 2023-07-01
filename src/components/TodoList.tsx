import React, { useEffect, useState } from 'react';


import Todo from "./Todo";
import {BsSun,BsCheck} from "react-icons/bs"

import { useQuery,gql,useMutation , ApolloError} from "@apollo/client";



const TODO_QUERY = gql`
query todolist{
  todo{
   id
   description
   isDone
}
}
`

const GET_SINGLE_TODO = gql`
query getsingletodo($id:Int!){
  singletodo(id: $id){
   id
   description
   isDone
}
}
`


const ADDTODO = gql`
mutation addtodo($description: String!){
  posttodo(description: $description){
   id
   description
   isDone
}
}
`

const UPDATETODO = gql`
mutation edittodo($id:Int!){
  updatetodo(id: $id){
   id
   description
   isDone
}
}
`



;

const TodoList = () => {

 
    
  const {data,loading,error, refetch}=useQuery(TODO_QUERY);
  const [add]=useMutation(ADDTODO);
  const [update]=useMutation(UPDATETODO);
  const { data: singleTodoData } = useQuery(GET_SINGLE_TODO);
  


  const [newTodo,setNewTodo]=useState('');
  const [clicked,setClicked]=useState(false);
  const [errorMessage,setErrorMessage]=useState('erro');
  const [selectedTodo, setSelectedTodo] = useState('');
  const [notcompleted, setNotcompleted] = useState(0);
  const [selectedtab, setSelectedtab] = useState(false);
  const [all, setAll] = useState(false);

  

  const handleAddTodo = async (e: React.FormEvent)=>{
    e.preventDefault();
    setClicked(true);
    try {

      await add({
        variables:{
          description:newTodo,
        },
        refetchQueries: [{ query: TODO_QUERY }],
      })
      setNewTodo('')
    } catch (error) {
      if (error instanceof ApolloError){
        // setErrorMessage("error")
      } 
    }

  }

 
  const handleUpdateTodo=async(id:string)=>{
    try{
      await update({
        variables:{
          id
        },
      })
    }catch(error){
      console.log(error)
    }

  }


 




  useEffect(() => {
    const timeout = setTimeout(() => {
      setClicked(false);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [clicked]);

  
  useEffect(()=>{
    if (data&&data.todo){
      const notdone = data.todo.filter((todo:any) => todo.isDone===false)
      console.log(notdone.length);
      const notdoneLength = notdone.length || 0;
      setNotcompleted(notdoneLength);

    }
   
  },[data])
  
   
  




  
    return (
      <div className="h-screen bg-black flex justify-center ">
      <div className=' h-2/6 w-full absolute top-0 bgc '>

      </div>
      <div className='h-4/5 w-2/4 absolute top-10 flex flex-col justify-between '>
      <div className='h-10 flex  justify-between '>
        <h1 className='text-white text-4xl font-middle '>TODO</h1>

        <span className='text-white text-xl '>
          <BsSun size={30} />
        </span>
      </div>
      <div className=' h-[95%]'>
         <div className=' bg-black1 border-3 h-16 mb-3' >
         <form action="" className=' h-full px-3 flex items-center' onSubmit={handleAddTodo}>
          {clicked ?

            (<button className='w-5 h-5  rounded-full border  border-brightGray mr-3 flex items-center justify-center text-white ' > 
             <BsCheck />
           </button>):
            (<button type="submit" className={`w-5 h-5   rounded-full border border-brightGray mr-3 `} />)
          }
        


          <input 
          type="text"
          className='w-[95%] bg-black1  '
          placeholder='Create a new todo ' 
          value={newTodo}
          onChange={(e) =>setNewTodo(e.target.value)}
          />
        </form>
         </div>
         <div className='bg-black1 h-[85%] mb-0  scr scroll-content' >
         
        <div>
          {all?(
            data && data.todo.map((todo:any) => (
              <Todo key={todo.id}  todoapp={todo} handleupdate={handleUpdateTodo} />
    
            ))
          ):data && data.todo.slice(0,6).map((todo:any) => (
            <Todo key={todo.id}  todoapp={todo} handleupdate={handleUpdateTodo} />
  
          ))  }
      
        </div>

         </div>

         <div className=' bg-black1 border-3 h-16 px-3 fixed flex justify-between  w-2/4  ' >

          <h1 className='text-brightGray'> {notcompleted} items left</h1>
          <h1 className={`text-brightGray${all&&'font-bold text-blue'}`} onClick={()=>setAll(true)} >All</h1>
          <h1 className='text-brightGray'>Active</h1>
          <h1 className='text-brightGray'>Completed</h1>

         </div>

      </div>
      
      </div>
     
    </div>
    
     
     
    );
  };
  
  export default TodoList;