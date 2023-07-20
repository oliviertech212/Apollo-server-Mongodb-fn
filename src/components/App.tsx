import React, {useState} from 'react';
import './../styles/App.css';

import TodoList from './TodoList';

import {BsSun,BsCheck} from "react-icons/bs"


import { MyContext } from '../Mycontext';
import DarkModeProvider from '../Mycontext';

const App:React.FC=() =>{
  
  return (

    <DarkModeProvider>
    <TodoList/>
    </DarkModeProvider>
  
    
    
  );
}

export default App;
