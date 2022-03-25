import * as React from "react";
import axios from 'axios';
import { useState } from "react";

// import "./styles.css"
import { Container, Divider, Stack, } from "@mui/material"
// import { useState } from "react"
// import { InputRow } from "./components/InputRow"
// import RemoveIcon from "@mui/icons-material/Remove"
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from "@mui/icons-material/Add"

import Dropzone from "react-dropzone";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Link, useHistory } from "react-router-dom";
import fs from 'fs'
import {
  Button,
  InputAdornment,
  Modal,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  LinearProgress,
  IconButton,
} from "@mui/material";
import "./notification.scss";
import user_icon from "../../assets/image/user_icon.png";
import search_icon from "../../assets/image/search_icon.svg";
import upload_icon from "../../assets/image/upload_icon.svg";
import file_icon from "../../assets/image/file_icon.svg";
import close_icon from "../../assets/image/close_icon.svg";
import error_icon from "../../assets/image/error-icon.svg";
import request_check from "../../assets/image/request_check.svg";
import loading from "../../assets/image/loading.svg";
import download_file from "../../assets/image/download_file.svg";
import { ClassNames } from "@emotion/react";
import ChipInput from 'material-ui-chip-input';

// import validator from 'validator';
import { saveAs } from "file-saver"
import { Base64 } from 'js-base64';
import socketIOClient from "socket.io-client";
// import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3005";
// import { setInterval } from "timers";


// Table Data
function createData(
  fileName: string,
  owner: string,
  description: string,
  lastModified: string,
  lastModifiedBy: string
) {
  return { fileName, owner,  lastModified, lastModifiedBy };
}


// large Modal Style
const largeModalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 950,
  borderRadius: 4,
};

// small Modal Style
const smallModalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 330,
  borderRadius: 4,
};

export default function Notification() {

    // const [name, setName] = useState("")
//   const [story, setStory] = useState({})
  const [emailError, setEmailError] = useState('')
  const [inputFields, setInputFields] = useState([
    {
      email: ""
    }
  ])

 React.useEffect(()=>{
   
    var element = document.getElementsByClassName("active")[0];
    if(element){
        element.classList.remove("active");
    }
   
    
  },[])
  const emailValidation=()=>{
    console.log(inputFields,'fi')
    console.log(inputFields,'fi')
    let status=true;
//    const regex ="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$"
    //   const regex="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(inputFields){
       
        inputFields.map(item=>{
            // console.log(/\S+@\S+\.\S+/.test(item.email),'list')
            if(!item.email || regex.test(item.email) === false){
                setEmailError('Not Valid')
                console.log(emailError,'nt')
                status=false
                return false;
               
            }
            
            // setEmailError(' Valid')
            // console.log("valid")
           
        })
        // return 
        return  status;
    }else{
        return false;
    }
    

  }
  const handleSubmit = async (e:any) => {
    console.log(inputFields,'fi')
    e.preventDefault()
    if( emailValidation()){
        console.log('Success')
        console.log(inputFields,'in')
        
    }else{
        console.log(' Email Id Wrong')
    }
    
    
   
    // console.log("jennie", story)
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, index: number) => {
    const values:any = [...inputFields]
    console.log("momo", values)
    // values=event.target.value
    values[index][event.target.name ] = event.target.value

    setInputFields(values)
    console.log(inputFields)
  }

  
  // adds new input
  const handleAdd = () => {
    setInputFields([
      ...inputFields,
      {
        email: ""
      }
    ])
  }

  // removes input
  const handleRemove = (item:any,index:any) => {
      console.log(item,'item')
    console.log(index,'i')
      let i=parseInt(index,10)
      console.log(i,'i')
    if (inputFields.length !== 1) {
      const values = [...inputFields]
      values.splice(index, 1)
      setInputFields(values)
    }
  }

 
  return (
    <>
     <div className="wrapper">
        <div className="main-content file-vault">
      <Container maxWidth="xs">
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
           
        <p>Please enter all email addresses that should be notified when a file has been compromised.</p>
            {inputFields.map((item, index) => (
              <div key={index}>
                <TextField
                  name="email"
                  required
                  fullWidth
                  label="Email"
                  onChange={(event) => handleChange(event, index)}
                  value={item.email}
               />
                <div>
                  <IconButton onClick={()=>handleRemove(item,index)}>
                    <RemoveIcon />
                  </IconButton>
                  <IconButton onClick={handleAdd}>
                    <AddIcon />
                  </IconButton>
                </div>
                
              </div>
            ))}
            <Button type="submit" variant="contained" disableElevation >
              Save
            </Button>
            <Button disableElevation>Cancel</Button>
          </Stack>
        </form>
      </Container>
      </div></div>
    </>

//     const [inputFields, setInputFields] = useState([])
//     const [email,setEmail] =useState([])
//     const [formValues, setFormValues] = useState([{ email : ""}])
//     // removes input
//   const handleRemove = () => {
//     // if (inputFields.length !== 1) {
//     //   const values = [...inputFields]
//     //   values.splice(index, 1)
//     //   setInputFields(values)
//     // }
//   }

//   let addFormFields = () => {
//     setFormValues([...formValues, { email: "" }])
//  }
//   // adds new input
//   const handleAdd = () => {
//     setInputFields([
//       ...inputFields,
      
//     ])
//   }
//   let handleChange = (i:any, e:any) => {
//     let newFormValues = [...formValues];
//     // newFormValues[i ][e.target.name]  = e.target.value;
//     setFormValues(newFormValues);
//  }

 
//   return (
//     <>
//      <Stack spacing={2} style={{ alignItems: "center" }}>
//       <TextField
//         name="email"
//         required
        
//         label="Emai"
//         onChange={handleChange}
//         // onChange={(event,index) => handleChange(event, index )}
     
//      />

//       <div>
//         <Button onClick={() => addFormFields()}>+</Button>
//         <Button onClick={()=>handleAdd}>js</Button>
//       </div>
//     </Stack>
                
            
//     </>
//   );
  )
}

