import React, { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext';
import {BsFillMoonFill , BsFillSunFill} from 'react-icons/bs'

export default function Header()

 {

const { lightMode , darkMode , white } = useContext(AuthContext)


  return (
    <> 
    
    <nav className="navbar navbar-expand  shadow "style={{backgroundColor: white == 1 ? "black":'white'}}>
  <div className="container">
    <a className='nav-link active m-2 fs-1 fw-bold '  style={{color: white == 1 && "white"}}>MUUFA</a>
    <button className="navbar-toggler d-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
      <div role="search">
        
        {white==null 
        ?
        <button className="btn btn-dark btn-sm " type="submit" onClick={()=>darkMode(1)}><BsFillMoonFill className="fs-6"/> dark Mode</button>
        :
        <button className="btn btn-light btn-sm" type="submit" onClick={()=>lightMode(null)}><BsFillSunFill className="text-warning fs-5"/>Light Mode</button>

        }
 

      </div>
    </div>



  </div>
</nav>

    
    
      </>
  )
}
