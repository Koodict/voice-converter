import React, { useState , useContext } from 'react'
import { collection , getDocs,where , query } from 'firebase/firestore/lite'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { firestore } from '../../../Config/firebase';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Link } from 'react-router-dom';
import {BsFillMoonFill , BsFillSunFill} from 'react-icons/bs'
import {AiFillDelete} from 'react-icons/ai'


export default function History() {
      
      const {user , white , darkMode ,lightMode } = useContext(AuthContext)
      
      const [ document , setDocument ] = useState([])
      const [Loading , setLoading] = useState(true)
      
      
      
       const fetchDocument = async() =>
      {
      
        
        let array = []

        const q = query(collection(firestore, "Text"));
      
        const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      let data =doc.data()
      // doc.data() is never undefined for query doc snapshots
      //console.log(data)
      
      array.push(data)
      });
      
      setDocument(array)
      setLoading(false)
      }
      
      useEffect(()=>
      {
      
      fetchDocument()
      
      },[user])
      
     
      ///////////////////////////////////////////////////
      
    

  return (
    <>

<main style={{backgroundColor: white == 1 && "black"}}>

{
  Loading ? (
    <div className="text-center">
      <div className="spinner-grow spin spinner-grow-lg bg-danger"></div>
    </div>
  ) : document.length === 0 ? (
    <div className="backColor">
      <div className="container">
        <div className="row">
          <div className="col col-12 col-md-6 col-lg-6 offset-lg-3 offset-md-2 mb-5 py-5">
            <div className="card p-2 p-md-3 p-lg-4">
              <div className="row">
                <div className="col py-2">
                  <p className="text-center fw-bold fs-1">
                    <Link to="/">Save Text</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="d-flex justify-content-center align-items-center">
      <div className="container-fluid">
        <div className="row">
          <div className="col col-12">
            <>
              <h1
                className="text-center mt-5"
                style={{ color: white === 1 ? "white" : "black" }}
              >
                Saved History
              </h1>
              <div className="rounded-3 p-2 p-md-5">
                <>
                  <Table
                    className={`table ${
                      white === 1 ? "table-dark table-hover" : "table-striped table-hover"
                    }`}
                  >
                    <Thead>
                      <Tr>
                        <Th>Sr : No</Th>
                        <Th>Save Date</Th>
                        <Th>Save Time</Th>
                        <Th>Save Text</Th>
                        <Th>Delete</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {document.map((todo, i) => (
                        <Tr key={i}>
                          <Td>
                            <p className="inlineCount">{i + 1}</p>
                          </Td>
                          <Td>
                            <p>{todo.date}</p>
                          </Td>
                          <Td>
                            <p>{todo.times}</p>
                          </Td>
                          <Td>
                            <p>{todo.text}</p>
                          </Td>
                          <Td>
                            <button
                              style={{ background: "none", border: "none" }}
                            >
                              <AiFillDelete
                                className="fs-3"
                                style={{ color: white === 1 ? "red" : "black" }}
                              />
                            </button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                  <div className="row">
                    <div className="col text-end">
                      <Link to="/" className="nav-link active text-white">
                        Save more Text +
                      </Link>
                    </div>
                  </div>
                </>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  )
}

</main>
    
    
    
    
    </>
  )
}
