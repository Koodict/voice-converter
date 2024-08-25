import React from 'react'

const date = new Date().getFullYear()



export default function Footer() 
{



  return (
    <>
    
    <footer className="bg-dark p-2">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="text-white text-center mb-0">&copy;<span> {date} </span>Developed by Usama Irshad</p>
            </div>
          </div>
        </div>
      </footer>

    
    
    </>
  )
}
