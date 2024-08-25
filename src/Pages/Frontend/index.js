import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Hero from './MainPage/Hero'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import History from './HistoryPage/History'

export default function index() {
  return (
    <>
    
 <Header/> 


    <Routes>


<Route>

<Route index element={<Hero/>}/>
<Route path='/history' element={<History/>}/>

</Route>

    </Routes>

<Footer/>
    
     
    
    
    </>
  )
}
