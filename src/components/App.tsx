import React from 'react';
import './../styles/App.css';

import TodoList from './TodoList';

import {BsSun,BsCheck} from "react-icons/bs"

const App:React.FC=() =>{
  return (
    <>
    <TodoList/>
    </>
  );
}

export default App;
