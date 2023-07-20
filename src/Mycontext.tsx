import { createContext, useState } from "react";


export const MyContext=createContext(
   { darkmode:false,toggleDarkMode:()=>{},toggleLightMode:()=>{},}
);

type DarkModeProviderProps = {
    children: React.ReactNode;
  };

function DarkModeProvider(props:DarkModeProviderProps){
    const [darkmode,setDarkmode]=useState(false);

    const toggleDarkMode=() => {
        setDarkmode(!darkmode);
    }
    const toggleLightMode=() => {
        setDarkmode(darkmode);
    }

    return(
        <>
        <MyContext.Provider value={{darkmode,toggleDarkMode,toggleLightMode}}>
            {props.children}
        </MyContext.Provider>
        </>
        

    )

}

export default DarkModeProvider;