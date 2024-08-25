import React from 'react'
import './App.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import  Routes  from './Pages/Routes'
import AuthContextProvider from './context/AuthContext';

export default function App() {
  return (
    <>
    
<AuthContextProvider>

    <Routes/>
</AuthContextProvider>
    
    
    
    </>
  )
}
