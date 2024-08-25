import React, { useContext,  useEffect,  useState } from "react";
import SpeechRecognition, {useSpeechRecognition,} from "react-speech-recognition";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import {BsFillMoonFill , BsFillSunFill} from 'react-icons/bs'
import { AuthContext } from "../../../context/AuthContext";
import {GrPowerReset} from 'react-icons/gr'
import {  doc, serverTimestamp, setDoc } from "firebase/firestore/lite";
import { firestore } from "../../../Config/firebase";
import { Link } from "react-router-dom";



const initialState = {text:''}

window.getRandomId = ()=>Math.random().toString(36).slice(2)


export default function App() 

{
  const {white , user} = useContext(AuthContext)
  const [copied, setCopied] = useState(false);
  const [stop, setStop] = useState(false);
const [state , setState] = useState(initialState)  

const { transcript , resetTranscript, browserSupportsSpeechRecognition } 
     = useSpeechRecognition()
     
     
     
     useEffect(() => {
       setState((prevState) => ({ ...prevState, text: transcript }));
     }, [transcript]);
     
 
 const handleStartListening = () =>    
  {
    setStop(true)
    SpeechRecognition.startListening(({ continuous: true, language: 'en-IN' }))
  }  

  const handleStopListening = () =>
  {
    setStop(false)
    SpeechRecognition.stopListening()
  }  

  const handleCopy = () => {
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);  
  };  

 if (!browserSupportsSpeechRecognition) {
    return (
      <p className="text-white fs-3 text-center my-5">
        Browser doesn't support speech recognition.
      </p>    
    );
  }  


const handleChange = (e) =>
{
  setState({...state,[e.target.name]:e.target.value})

}

const handleSubmit = (e) =>
{

  e.preventDefault()

const {text} = state;

if(!text)
{
  alert('no text error')
  return
}


const currentDate = new Date();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();
const ampm = hours >= 12 ? 'Pm':'Am'

 const Time = hours +':'+ minutes +":"+ seconds +":"+ ampm

console.log(Time)

const formData = {text} 
formData.dateCreated = serverTimestamp()
formData.id=window.getRandomId()
formData.date = new Date().toLocaleDateString()
formData.times = Time



  console.log(formData)

  
createDocument(formData)

}

const createDocument = async(formData)=>
{

try
{
  setDoc(doc(firestore, 'Text' ,formData.id),formData)
  alert('text successfully added')
  resetTranscript()
}

catch
{
  alert('Something went wrong , text is"nt Added' , 'error')
}

}

  return (
    <>
    
  



 <div style={{backgroundColor: white == 1 ? "black":'white'}} className="d-none d-md-block">

    <div className="container">
     <h1 className='text-center fw-bold mt-4' style={{color: white == 1 && "white"}}>Speech to Text Converter</h1>
    
        <div className="row mb-5">
          <div className="col col-md-6 col-12 cardSet">
<div className="card p-5  home shadow" style={{backgroundColor: white == 1 ? "#212529":'white'}}>

<button className="buttons btn btn-info  p-3 " onClick={handleStartListening}>Start listening</button>


<button className=' buttons btn btn-warning  p-3 'onClick={handleStopListening}>Stop Listening</button>
<button className=' buttons btn btn-danger  p-3 ' onClick={handleSubmit} >Save Listening</button>

<Link to='/history' className=' buttons btn btn-primary  p-3 '>History</Link>

  <CopyToClipboard text={transcript} onCopy={handleCopy}><button className="btn btn-success p-3 buttons">
{copied ? 'Copy' : 'Copy text'}</button></CopyToClipboard>

    </div>
    </div>  


    <div className="col col-md-6 col-12  ">
    <button className='p-3   rounded-5 border-0 shadow m-0'>
      {
        !stop
        ?
        <FaMicrophoneSlash className='fs-3' />
        :
        <FaMicrophone className='fs-4' />
      }
                </button>

<div className="card p-5  home shadow"  style={{backgroundColor: white == 1 ? "#212529":'white'}}>

  <textarea name="desc"  className="d-none" value={state.text} onChange={handleChange} />

  <div><p className="fs-4 " style={{color: white == 1 ? "white":'black'}} >{transcript}</p></div>


      <div className="d-flex justify-content-end  ">
  <button className='p-3   bg-info rounded-5 border-0 shadow  resetIcon' onClick={() => {resetTranscript()}} style={{width:'60px'}}>
  <GrPowerReset className="fs-4 " />
                </button>

      </div>

    </div>
    </div>
          </div>
                  </div>
        </div>







   {/* mobile phase */}


  <div style={{backgroundColor: white == 1 ? "black":'white'}} className="d-block d-md-none ">

<div className="container">

<h1 className='text-center fw-bold mt-5 d-block d-md-none' style={{color: white == 1 && "white"}}>Speech to Text Converter</h1>

    <div className="row mb-5">
      <div className="col  col-12">
        
<div className=" card p-5  home shadow" style={{backgroundColor: white == 1 ? "#212529":'white'}}>
  <div className="text-center">

<button className='p-3 microIcon'  onClick={SpeechRecognition.stopListening}>
  {
    !stop
    ?
    <FaMicrophoneSlash className='fs-3' />
    :
    <FaMicrophone className='fs-4' />
  }
            </button>
    </div>

<div className=" card p-5  shadow" style={{backgroundColor: white == 1 ? "black":'white'}} >
<div><p className="fs-4" style={{color: white == 1 ? "white":'black'}}>{transcript}</p>

<div className="text-end">
  <button className='p-2 bg-info rounded-5 border-0 shadow resetIcons' onClick={() => {resetTranscript()}}>
  <GrPowerReset className="fs-3 " />
                </button>

      </div>
</div>

</div>

<button className="buttons btn btn-info  btn-sm p-2 " onClick={handleStartListening}>Start listening</button>

<button className=' buttons btn btn-warning  btn-sm p-2 'onClick={handleStopListening}>Stop Listening</button>

<button className=' buttons btn btn-danger  p-2 ' onClick={handleSubmit} >Save Listening</button>

<Link to='/history' className=' buttons btn btn-primary  p-2 '>History</Link>


<CopyToClipboard text={transcript} onCopy={handleCopy}><button className="btn btn-success p-2 btn-sm' buttons">
{copied ? 'copy' : 'copy text'}</button></CopyToClipboard>

</div>
</div>  





  


</div>
</div>
      </div>

     
              
  
    </>
  )
}



