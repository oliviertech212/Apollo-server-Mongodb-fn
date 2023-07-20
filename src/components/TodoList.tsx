import React, { useEffect, useState,useContext } from 'react';


import Todo from "./Todo";
import {BsSun,BsCheck ,BsMoon} from "react-icons/bs"

import { useQuery,gql,useMutation , ApolloError} from "@apollo/client";

import { MyContext } from '../Mycontext';


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
`;


interface TODO{
  id:String  
  createdAt: Date
  description: String
  isDone :     Boolean 
}

const TodoList = () => {
  const {data,loading,error, refetch}=useQuery(TODO_QUERY);
  const [add]=useMutation(ADDTODO);
  const [update]=useMutation(UPDATETODO);
  const { data: singleTodoData } = useQuery(GET_SINGLE_TODO);


  // context APi

  const {darkmode,toggleDarkMode,toggleLightMode}=useContext(MyContext)
  const handleclick =()=>{
    toggleDarkMode()
  }
  const handleLightmode =()=>{
    toggleLightMode()
  }
  


  const [newTodo,setNewTodo]=useState('');
  const [clicked,setClicked]=useState(false);
  const [errorMessage,setErrorMessage]=useState('erro');
  const [selectedTodo, setSelectedTodo] = useState('');
  const [notcompleted, setNotcompleted] = useState(0);
  const [selectedtab, setSelectedtab] = useState('');
  const [all, setAll] = useState(false);
  const [active,setActive] = useState(false);
  const [complete,setComplete] = useState(false);
  
  

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
      const notdone = data.todo.filter((todo:TODO) => todo.isDone===false)
      const notdoneLength = notdone.length || 0;
      setNotcompleted(notdoneLength);

    }
    
   
  },[data])


  if (data&&data.todo){
    const active = data.todo.filter((todo:TODO) => todo.isDone===false)
    // console.log(notdone);
   

  }
  
   
  




  
    return (
      <div className={`h-screen ${ darkmode?'bg-black text-white':' bg-white'} flex justify-center` }>
      <div className=' h-2/6 w-full absolute top-0 bgc '>

      </div>
      <div className='h-4/5 w-2/4 absolute top-10 flex flex-col justify-between '>
      <div className='h-10 flex  justify-between '>
        <h1 className={`text-white text-4xl font-middle ${ !darkmode&& 'text-black'} `}>TODO</h1>
        
        {darkmode?
        <span className='text-white text-xl '>
        <BsSun size={30} onClick={handleclick} />   
      </span>:
      <span className='text-black text-xl '>
        <BsMoon size={30} onClick={handleLightmode} />  
    </span>
        }
        
       
      </div>
      <div className=' h-[95%]'>
         <div className={` bg-black1 ${!darkmode&& 'bg-brightGray text-black'}   border-3 h-16 mb-3`} >
         <form action="" className=' h-full px-3 flex items-center' onSubmit={handleAddTodo}>
          {clicked ?

            (<button className={`w-5 h-5  rounded-full border  border-brightGray ${!darkmode && 'border-black text-black'} mr-3 flex items-center justify-center text-white `} > 
             <BsCheck />
           </button>):
            (<button type="submit" className={`w-5 h-5 cursor-progress   rounded-full border border-brightGray mr-3 `} />)
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
        <div className={`bg-black1 ${!darkmode&&' bg-brightGray text-black '}  h-[85%] mb-0  scr scroll-content`}>
         
        <div>
          {selectedtab==='all'&&(
            data && data.todo.map((todo:TODO) => (
              <Todo key={todo.id}  todoapp={todo} handleupdate={handleUpdateTodo} darkmode={darkmode} />
    
            ))
          )
          
          }


         {selectedtab==='active'&&(
            data && data.todo.filter((todo:TODO) => todo.isDone===false).map((todo:TODO) => (
              <Todo key={todo.id}  todoapp={todo} handleupdate={handleUpdateTodo}  darkmode={darkmode}/>
    
            ))
          )
           }


         {selectedtab==='complete'&&(
            data && data.todo.filter((todo:TODO) => todo.isDone===true).map((todo:TODO) => (
              <Todo key={todo.id}  todoapp={todo} handleupdate={handleUpdateTodo} darkmode={darkmode} />
    
            ))
          )
           }

            
            {
              selectedtab===''&&(
                data && data.todo.slice(0,6).map((todo:TODO) => (
                  <Todo key={todo.id}  todoapp={todo} handleupdate={handleUpdateTodo} darkmode={darkmode} />)
              ))

            }
         
  
          
      
        </div>

         </div>

         <div className={` bg-black1 border-3 h-16 px-3 fixed flex justify-between ${!darkmode && 'border-black text-black bg-brightGray'}   w-2/4  ` }>

          <h1 className={`${!darkmode&&' text-black'} text-brightGray`}> {notcompleted} items left</h1>
          <h1 className={`text-brightGray ${!darkmode&&' text-black'} cursor-pointer ${selectedtab==='all'&&('font-bold text-white underline')}`} onClick={()=>setSelectedtab('all')} >All</h1>
          <h1 className={`text-brightGray ${!darkmode&&' text-black'}  cursor-pointer ${selectedtab==='active'&&'font-bold text-white underline '}`} onClick={()=>setSelectedtab('active')}>Active</h1>
          <h1 className={`text-brightGray ${!darkmode&&' text-black'}  cursor-pointer ${selectedtab==='complete'&&'font-bold text-white underline '}`} onClick={()=>setSelectedtab('complete')}>Completed</h1>

         </div>
       

      </div>
      
      </div>
     
    </div>
     
    );
  };
  
  export default TodoList;