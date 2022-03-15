import * as React from "react";
import Dropzone from "react-dropzone";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Link ,useHistory} from "react-router-dom";
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
} from "@mui/material";
import "./file-vault.scss";
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
import axios from 'axios';
import { useState } from "react";

// Table Data
function createData(
  fileName: string,
  owner: string,
  description: string,
  lastModified: string,
  lastModifiedBy: string
) {
  return { fileName, owner, description, lastModified, lastModifiedBy };
}


// const rows = [
//   {
//     fileName:"File_name_1",
//     owner:"Me",
//     description:"This is a generic item description. Please replace this with a more appro......",
//     lastModified:"25/02/2022  15:01:22",
//     lastModifiedBy:"Me"
//   },
  // {
  //   fileName:"File_name_1",
  //   owner:"Me",
  //   description:"This is a generic item description. Please replace this with a more appro......",
  //   lastModified:"25/02/2022  15:01:22",
  //   lastModifiedBy:"Me"
  // },
  // {
  //   fileName:"File_name_1",
  //   owner:"Me",
  //   description:"This is a generic item description. Please replace this with a more appro......",
  //   lastModified:"25/02/2022  15:01:22",
  //   lastModifiedBy:"Me"
  // },
  
  
  
// ];

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

export default function FileVault() {

  //Dummy File Data 
  

  const [rows,setRows]=useState( [
    {
      fileName:"File_name_1",
      owner:"Me",
      description:"This is a generic item description. Please replace this with a more appro......",
      lastModified:"25/02/2022  15:01:22",
      lastModifiedBy:"Me"
    }])
    const [ rowData, setRowData ] = useState(rows);

  // file Upload JS
  const [uploadOpen, setUploadOpen] = React.useState(false);
  const [uploadPopup,setUploadPopup] = React.useState(false)
  const [tags, setTags] = React.useState([]);
  //onclick file details
  const [fileDetails,setfileDetails]=useState({} as any)
  const fileUploadOpen = () => setUploadOpen(true);
  const fileUploadClose = () => {setUploadOpen(false); setData([]);}

  // File Detail Modal JS
  const [fileOpen, setFileOpen] = React.useState(false);
  const fileOpenClick = (item:any) =>{
    console.log(item,'value')
    setfileDetails(item)
    setFileOpen(true);
    console.log(fileDetails,'fileDetails')
  } 
  const fileClose = () => setFileOpen(false);

  // Waring Detail Modal JS
  const [warnOpen, setWarnOpen] = React.useState(false);
  const warningOpen = () => setWarnOpen(true);
  const warningClose = () => setWarnOpen(false);
  const history = useHistory()
  // Request Detail Modal JS
  const [requestOpen, setRequestOpen] = React.useState(false);
  const requestOpenClick = () => setRequestOpen(true);
 

  // File Verify Modal JS
  const [fileVerify, setFileVerify] = React.useState(false);
  const fileVerifyOpen = () => setFileVerify(true);
  const fileVerifyClose = () => setFileVerify(false);

  const requestClosePopup =() => setUploadPopup(true);

  const [filelist,setFileList] = React.useState()
  const handleReplace =()=>{
    setUploadOpen(true)
  }

  const requestCloseClick = () => {
    setRequestOpen(false)
    fetchFiles()
    
    }
  // Progressbar JS
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
const fetchFiles= () =>{ 
  
  axios.get('http://localhost:3005/fortis/getfile')
  
    .then(res =>{
      console.log(res.data.data.split('#'))
      setFileList(res.data.data.split('#'))
      const temp=res.data.data.split('#')
      temp.pop()
      console.log(temp,'temp')
      const result =temp.map((item:any,index:any) =>({
        // ...item,
        fileName:temp[index]? temp[index] :item.fileName,
        owner:rows[0].owner,
        description:rows[0].description,
        lastModified:rows[0].lastModified,
        lastModifiedBy:rows[0].lastModifiedBy
      }    
      ))
      console.log(result)
      setRows(result)
      setRowData([...result])
     
     
    })
    .catch(err  =>{
      console.log(err)
      
    })
  
}
  React.useEffect(()=>{
    fetchFiles()
  },[])
  // console.log(filelist,'filelist')

  // Drag & Drop JS
  const [fileNames, setFileNames] = React.useState([]);
  const [data, setData] = React.useState([]);
  const handleDrop = (acceptedFiles: any) => {
    setFileNames(acceptedFiles.map((file: any) => file.name) as any);
    setData(acceptedFiles);
   
   
  };
  
  const handleDelete = (i: any, chip: any) => {

    setTags(tags.filter((tag, index) => index !== chip));
  };

  const handleAddition = (tag: any) => {
    setTags([...tags as any, tag] as any);
  };

  const handleTextChange = (e: any) => {
    // Search Functionality
    let search: any = e.target.value;

    if (e.target.value === "") {
      setRowData(rows);
    } else {
      let newRowData: any = rows.filter((data) => {
        if (data.fileName.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
          return data;
        }
      });
      setRowData(newRowData);
    }
  }
  // console.log(data,'data')
  // const fs = require(“fs”);
  // console.log(tags,'tags')
const handleFileUpload =() =>{
  setFileVerify(true)
  const datafile = new FormData()
  datafile.append('fileupload', data[0] as any )
  datafile.append('tags',tags as any)
 const formdata ={
 
 }
 axios.post('http://localhost:3005/fortis/addfile',datafile) 

 
 .then(response=>{
   console.log('success')
   console.log(response.data)
   setRequestOpen(true)
   setUploadOpen(false)
   setFileVerify(false)
 })
 .catch(err=>{
  console.log(err)
  setFileVerify(false)
 })
}

const handleChange=(e:any)=>{
console.log(e.target.files[0])
}
  return (
    <>
      {/* Header HTML Start*/}
      {/* <Header /> */}
      {/* Header HTML End*/}

      {/* Sidebar HTML Start*/}
      {/* <Sidebar /> */}
      {/* Sidebar HTML End*/}
      <div className="wrapper">
        <div className="main-content file-vault">
          <div className="file-search">
            <div className="search-left">
              <p>Select Files to request</p>
              <TextField
                fullWidth
                label="Search File"
                onChange={handleTextChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <em>
                        <img src={search_icon} alt="search" />
                      </em>
                    </InputAdornment>
                  ),
                }}
                variant="filled"
              />
            </div>

            <div className="search-right">
              <Button variant="outlined" onClick={fileUploadOpen}>
                Click or Drag to Add New File
                <em>
                  <img src={upload_icon} alt="upload" />
                </em>
              </Button>

              <Modal
                open={uploadOpen}
                onClose={fileUploadClose}
                aria-labelledby="file-upload-title"
                aria-describedby="file-upload-description"
                className="modal-outer"
              >
                <div className="modal-large" style={largeModalStyle}>
                  <em
                    className="close-button"
                    onClick={fileUploadClose}
                    onKeyDown={fileUploadClose}
                    role="button"
                    tabIndex={0}
                  >
                    <img src={close_icon} alt="close" />
                  </em>
                  {!data.length ?
                  <div  className="file-drop-outer"  onChange={handleChange}>
                    <h2 className="h2">Drag or Add Files</h2>

                    <Dropzone onDrop={handleDrop} >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps({ className: "file-drop-box" })}>
                          <h2>Add Files</h2>
                          <Button
                            variant="contained"
                            endIcon={
                              <em>
                                <img src={upload_icon} alt="upload" />
                              </em>
                            }
                          >
                            CHOOSE FILES
                            <input {...getInputProps()} />
                          </Button>
                          <span>or drop files here</span>
                        </div>
                      )}
                    </Dropzone>
                  </div> : <div className="preview-box-outer">
                    <div className="preview-box-inner" >
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Soluta est praesentium odit, ipsam deserunt
                        aliquid voluptatem inventore! Ducimus fuga beatae quae,
                        eum temporibus quisquam. Dicta voluptate ipsam fugiat
                        dolor expedita.
                        </p>
                        <div className="file-name">
                        
                            {fileNames.map((fileName) => (
                                <h3 className="h3">{fileName}</h3>
                            ))}
                        </div>
                      </div>
                    <Button onClick={()=>{setData([]);setFileNames([])}}>
                      Replace File
                      {/* <input type="file" /> */}
                    </Button>
                  </div> }

                  
                  <div className="tag-box-outer">
                    <h2 className="h2">Tags</h2>
                    <ChipInput
                      value={tags}
                      onAdd={(chip) => handleAddition(chip)}
                      onDelete={(chip, index) => handleDelete(chip, index)}
                    />
                  </div>

                  <div className="modal-button">
                  {!data.length ?
                    <Button variant="contained" color="primary" disabled>
                      UPLOAD
                    </Button>
                    :
                    <Button variant="contained" color="primary"  onClick={handleFileUpload}>
                    UPLOAD
                  </Button>
                  }
                  </div>
                </div>
              </Modal>
              {/* fileupload message  */}
              

              <div className="pagination-wrapper">
                <p>1-{rowData.length}</p>
                <Pagination count={10} />
              </div>
            </div>
          </div>
          <div className="table-wrapper">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>File Name</TableCell>
                    <TableCell>Owner</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Last Modified</TableCell>
                    <TableCell>Last Modified by</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowData.map((row) => (
                    <TableRow>
                      <TableCell>
                        <div className="table-data has-underline">
                          <em>
                            <img src={file_icon} alt="file" />
                          </em>
                          <span
                            onClick={()=>fileOpenClick(row)}
                            onKeyDown={fileOpenClick}
                            role="button"
                            tabIndex={0}
                          >
                            {row.fileName}
                          </span>
                        </div>
                      </TableCell>


                      <TableCell>{row.owner}</TableCell>
                      <TableCell>
                        <p className="description-message">{row.description}</p>
                      </TableCell>
                      <TableCell>{row.lastModified}</TableCell>
                      <TableCell>
                        <div className="table-data has-no-cursor">
                          <em>
                            <img src={user_icon} alt="user" />
                          </em>
                          {row.lastModifiedBy}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Modal
                        open={uploadPopup}
                        onClose={requestClosePopup}
                        aria-labelledby="upload-detail-title"
                        aria-describedby="upload-detail"
                        className="modal-outer"
                      >
                        <div className="modal-small" style={smallModalStyle}>
                          <div className="message-box">
                            <p className="h5">Congratulations</p>
                            <em>
                              <img src={request_check} alt="request" />
                            
                            </em>
                           
                            <p className="h5">Upload Complete</p>
                           
                          </div>
                          <div className="button-combo has-single-button">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={requestClosePopup}
                            >
                              Close
                            </Button>

                           
                          </div>
                        </div>
                      </Modal>
                       {/* file verify Popup HTML Start */}

                       <Modal
                        open={fileVerify}
                        onClose={fileVerifyClose}
                        aria-labelledby="file-verify-title"
                        aria-describedby="file-verify"
                        className="modal-outer"
                      >
                        <div className="modal-small" style={smallModalStyle}>
                          <div className="message-box">
                            <p className="h5">Please Wait</p>
                            {/* <p className="h5">Congratulations</p> */}
                            <em>
                              <img src={loading} alt="loading" />
                            </em>
                            {/* <p className="h5">File Requested</p> */}
                            <p className="h5">Uploading</p>
                            {/* <p className="h5">Verifying</p> */}
                            {/* <p className="h5">You have been succussfully Verified</p> */}
                            {/* <p className="h5">Downloading</p> */}
                            <LinearProgress variant="determinate" value={progress} />
                          </div>
                        </div>
                      </Modal>

                      {/* file verify Popup HTML end */}

                      
                      <Modal
                        open={fileOpen}
                        onClose={fileClose}
                        aria-labelledby="file-detail-title"
                        aria-describedby="file-detail"
                        className="modal-outer"
                      >
                        <div className="modal-small" style={smallModalStyle}>
                          {/* file-detail HTML */}
                          <ul className="file-detail-modal">
                           
                              <li>
                              <p>File Name:</p>
                              <span>{fileDetails && fileDetails.fileName }</span>
                            </li>
                            <li>
                              <p>File Owner:</p>
                              <div className="has-owner-detail">
                                <em>
                                  <img src={user_icon} alt="user" />
                                </em>
                                <span>Me</span>
                              </div>
                            </li>
                            <li>
                              <p>Access:</p>
                              <span>Yes</span>
                            </li>
                            <li>
                              <p>Details:</p>
                              <span>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Proin risus lectus, interdum a
                                scelerisque id, scelerisque ac tellus. Vivamus
                                ac iaculis lorem, euismod pulvinar sem.{" "}
                              </span>
                            </li>
                           
                            </ul>
                            

                          <div className="button-combo">
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={warningOpen}
                            >
                              Delete
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={fileVerifyOpen}
                            >
                              Download
                            </Button>
                          </div>
                        </div>
                      </Modal>

                     

                      {/* waring Popup HTML Start */}
                      <Modal
                        open={warnOpen}
                        onClose={warningClose}
                        aria-labelledby="warning-detail-title"
                        aria-describedby="warning-detail"
                        className="modal-outer"
                      >
                        <div className="modal-small" style={smallModalStyle}>
                          <div className="message-box">
                            <p className="h5">Warning</p>
                            <em>
                              <img src={error_icon} alt="close" />
                            </em>
                            <p className="h5">File Requesting Deletion</p>
                            <span>
                              This is a request to delete the file. Are you sure
                              you want to proceed?
                            </span>
                          </div>
                          <div className="button-combo">
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={warningClose}
                            >
                              No
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={requestOpenClick}
                            >
                              Yes
                            </Button>
                          </div>
                        </div>
                      </Modal>
                      {/* waring Popup HTML end */}

                      {/* request complete Popup HTML Start */}
                      <Modal
                        open={requestOpen}
                        onClose={requestCloseClick}
                        aria-labelledby="request-detail-title"
                        aria-describedby="request-detail"
                        className="modal-outer"
                      >
                        <div className="modal-small" style={smallModalStyle}>
                          <div className="message-box">
                            <p className="h5">Congratulations</p>
                            <em>
                              <img src={request_check} alt="request" />
                              {/* <img src={download_file} alt="download" /> */}
                            </em>
                            {/* <p className="h5">Request Complete</p> */}
                            <p className="h5">Upload Complete</p>
                            {/* <p className="h5">Download Complete</p> */}
                          </div>
                          <div className="button-combo has-single-button">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={requestCloseClick}
                            >
                              Close
                            </Button>

                            {/* <Button
                              variant="contained"
                              color="primary"
                              onClick={requestCloseClick}
                            >
                              Download
                            </Button> */}
                          </div>
                        </div>
                      </Modal>
                      {/* waring Popup HTML end */}
          </div>
        </div>
      </div>
      {/* Footer HTML Start*/}
      <Footer />
      {/* Footer HTML End*/}
    </>
  );
}
