import axios from 'axios'
import React, { useState } from 'react'
import { ProgressBar } from 'react-bootstrap'

function Case2() {
    const[file,setFile] = useState([])
    const[url,setUrl] = useState('')
    const[percentage,setPercentage] = useState(0)
    const[running,setRunning] = useState(false)

    console.log(percentage)

    function submitHandler(e){
        setRunning(true)
        e.preventDefault()

        const data = new FormData()
        data.append('file',file[0])

        const options = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
              const { loaded, total } = progressEvent;
              setPercentage(Math.floor((loaded * 100) / total))
            },
          };

        axios.post('https://jsonplaceholder.typicode.com/photos',data,options)
        .then(response =>{
            alert("Saved")
        })

        setTimeout(()=>{
            setRunning(false)
            setPercentage(0)
        },6000)
    }

    // if(percentage ===  100){
    //     alert("Data saved successfully !!")
    // }

  return (
    <form onSubmit={submitHandler}>
      <input type='file' onChange={(e)=>{
         setFile(e.target.files)
         setUrl(URL.createObjectURL(e.target.files[0]))
      }}/>

      <img src={url}/>
      <br/>
      <button onClick={submitHandler}>SUBMIT</button>

      {
        running && <ProgressBar now={percentage} label={`${percentage}%`}/>
      }

    </form>
  )
}

export default Case2