import "./add-file.scss"
import * as React from "react";
import Dropzone from "react-dropzone";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import Footer from "../../components/footer";
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

const rows = [
  createData(
    "File_name_1",
    "Me",
    "This is a generic item description. Please replace this with a more appro......",
    "25/02/2022  15:01:22",
    "Me"
  ),
  createData(
    "File_name_2",
    "Jane",
    "This is a generic item description. Please replace this with a more appro......",
    "25/02/2022  15:01:22",
    "Jane"
  ),
  createData(
    "File_name_3",
    "Me",
    "This is a generic item description. Please replace this with a more appro......",
    "25/02/2022  15:01:22",
    "Me"
  ),
  createData(
    "File_name_4",
    "Jane",
    "This is a generic item description. Please replace this with a more appro......",
    "25/02/2022  15:01:22",
    "Jane"
  ),
  createData(
    "File_name_5",
    "Me",
    "This is a generic item description. Please replace this with a more appro......",
    "25/02/2022  15:01:22",
    "Me"
  ),
  createData(
    "File_name_6",
    "Jane",
    "This is a generic item description. Please replace this with a more appro......",
    "25/02/2022  15:01:22",
    "Jane"
  ),
  createData(
    "File_name_7",
    "Me",
    "This is a generic item description. Please replace this with a more appro......",
    "25/02/2022  15:01:22",
    "Me"
  ),
  createData(
    "File_name_8",
    "Jane",
    "This is a generic item description. Please replace this with a more appro......",
    "25/02/2022  15:01:22",
    "Jane"
  ),
  createData(
    "File_name_9",
    "Me",
    "This is a generic item description. Please replace this with a more appro......",
    "25/02/2022  15:01:22",
    "Me"
  ),
  createData(
    "File_name_10",
    "Jane",
    "This is a generic item description. Please replace this with a more appro......",
    "25/02/2022  15:01:22",
    "Jane"
  ),
  createData(
    "File_name_11",
    "Me",
    "This is a generic item description. Please replace this with a more appro......",
    "25/02/2022  15:01:22",
    "Me"
  ),
  createData(
    "File_name_12",
    "Jane",
    "This is a generic item description. Please replace this with a more appro......",
    "25/02/2022  15:01:22",
    "Jane"
  ),
  createData(
    "File_name_13",
    "Me",
    "This is a generic item description. Please replace this with a more appro......",
    "25/02/2022  15:01:22",
    "Me"
  ),
  createData(
    "File_name_14",
    "Jane",
    "This is a generic item description. Please replace this with a more appro......",
    "25/02/2022  15:01:22",
    "Jane"
  ),
];

// large Modal Style
// const largeModalStyle = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 950,
//   borderRadius: 4,
// };

// small Modal Style
const smallModalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 330,
  borderRadius: 4,
};


const AddFile = () => {
  // file Upload JS
  const [uploadOpen, setUploadOpen] = React.useState(false);
  const [tags, setTags] = React.useState([]);
  const fileUploadOpen = () => setUploadOpen(true);
  const fileUploadClose = () => setUploadOpen(false);

  // File Detail Modal JS
  const [fileOpen, setFileOpen] = React.useState(false);
  const fileOpenClick = () => setFileOpen(true);
  const fileClose = () => setFileOpen(false);

  // Waring Detail Modal JS
  const [warnOpen, setWarnOpen] = React.useState(false);
  const warningOpen = () => setWarnOpen(true);
  const warningClose = () => setWarnOpen(false);

  // Request Detail Modal JS
  const [requestOpen, setRequestOpen] = React.useState(false);
  const requestOpenClick = () => setRequestOpen(true);
  const requestCloseClick = () => setRequestOpen(false);

  // File Verify Modal JS
  const [fileVerify, setFileVerify] = React.useState(false);
  const fileVerifyOpen = () => setFileVerify(true);
  const fileVerifyClose = () => setFileVerify(false);

  const handleReplace =()=>{
    setUploadOpen(true)
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

  // Drag & Drop JS
  const [fileNames, setFileNames] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [searchTerm, setSearchterm] = React.useState("")
  const handleDrop = (acceptedFiles: any) => {
    setFileNames(acceptedFiles.map((file: any) => file.name) as any);
    setData(acceptedFiles);
    console.log(data,'file Details')
  };

  const handleDelete = (i: any, chip: any) => {

    setTags(tags.filter((tag, index) => index !== chip));
  };

  const handleAddition = (tag: any) => {
    setTags([...tags as any, tag] as any);
  };

  const handleTextChange = (e: any) => {
    console.log(e.target.value)
    setSearchterm(e.target.value)
    // {data
    //   .filter((val) => {
    //     if (searchTerm == "") {
    //       return val
    //     } else if (
    //       val.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    //     )
    //      {
    //       return val
    //     }
    //   })
  }
  // console.log(searchTerm,'searchTerm')

  return (
    <>
      {/* Header HTML Start*/}
      {/* <Header /> */}
      {/* Header HTML End*/}

      {/* Sidebar HTML Start*/}
      {/* <Sidebar /> */}
      {/* Sidebar HTML End*/}
      <div className="wrapper">
        <div className="main-content my-files">
          <div className="file-search">
            {/* <div className="search-left">
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
            </div> */}

            <div className="search-right">
              <Button variant="outlined">
                Click or Drag to Add New File
                <em>
                  <img src={upload_icon} alt="upload" />
                </em>
              </Button>

              {/* <div className="pagination-wrapper">
                <p>1-50 of 1005</p>
                <Pagination count={10} />
              </div> */}
            </div>
          </div>
          <div className="table-wrapper">
          <h2>My Personal Files</h2>
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
                  {rows.map((row) => (
                    <TableRow>
                      <TableCell>
                        <div className="table-data has-underline">
                          <em>
                            <img src={file_icon} alt="file" />
                          </em>
                          <span
                            onClick={fileOpenClick}
                            onKeyDown={fileOpenClick}
                            role="button"
                            tabIndex={0}
                          >
                            {row.fileName}
                          </span>
                        </div>
                      </TableCell>

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
                              <span>File_Name_1</span>
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
                            <p className="h5">File Requested</p>
                            {/* <p className="h5">Verifying</p> */}
                            {/* <p className="h5">You have been succussfully Verified</p> */}
                            {/* <p className="h5">Downloading</p> */}
                            <LinearProgress variant="determinate" value={progress} />
                          </div>
                        </div>
                      </Modal>

                      {/* file verify Popup HTML end */}

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
                            <p className="h5">Request Complete</p>
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
          </div>
        </div>
      </div>
      {/* Footer HTML Start*/}
      <Footer />
      {/* Footer HTML End*/}
    </>
  );
}
export default AddFile
