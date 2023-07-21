import { createContext, useState,useEffect } from "react";


export const MyContext=createContext(
   { darkmode:false,toggleDarkMode:()=>{},toggleLightMode:()=>{},}
);

type DarkModeProviderProps = {
    children: React.ReactNode;
  };

function DarkModeProvider(props:DarkModeProviderProps){
    const mode =localStorage.getItem("mode")
    const [darkmode,setDarkmode]=useState(mode==="true");

    const toggleDarkMode=() => {
        localStorage.setItem('mode',"true")
        setDarkmode(true);
    }
    const toggleLightMode=() => {
        localStorage.setItem('mode',"false")
        setDarkmode(false);
    }

    useEffect(() => {
        const mode =localStorage.getItem("mode")
        
        if(mode!==null){
            setDarkmode(mode=='true');
        }
    },[])

    return(
        <>
        <MyContext.Provider value={{darkmode,toggleDarkMode,toggleLightMode}}>
            {props.children}
        </MyContext.Provider>
        </>
        

    )

}

export default DarkModeProvider;