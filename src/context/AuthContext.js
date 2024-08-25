import React ,{ createContext,  useState} from 'react'


export const AuthContext = createContext()


export default function AuthContextProvider(props)

{

const [white, setWhite] = useState(parseInt(localStorage.getItem('selectedColor')) || null);

const darkMode = (color) => 
{
  setWhite(color);
  localStorage.setItem('selectedColor', color); 
}

const lightMode = (color) => 
{
  setWhite(color)
   localStorage.setItem('selectedColor', color); 
}



return (
  
  <AuthContext.Provider value={{ white , setWhite , darkMode , lightMode }}>
        {props.children}
</AuthContext.Provider>
  )
  
}


