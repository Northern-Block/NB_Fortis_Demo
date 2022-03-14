import * as React from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import Footer from "../../components/footer";
import upload_icon from "../../assets/image/upload_icon.svg";
import "./update-files.scss";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import user_icon from "../../assets/image/user_icon.png";
import file_icon from "../../assets/image/file_icon.svg";

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
];

export default function Update() {
  return (
    <>
      {/* Header HTML Start*/}
      {/* <Header /> */}
      {/* Header HTML End*/}

      {/* Sidebar HTML Start*/}
      {/* <Sidebar /> */}
      {/* Sidebar HTML End*/}
      <div className="wrapper">
        <div className="main-content user-activity">
          <div className="file-search">
            <div className="search-right">
              <Button variant="outlined">
                Click or Drag to Add New File
                <em>
                  <img src={upload_icon} alt="upload" />
                </em>
                <input type="file" />
              </Button>
            </div>
          </div>

          <div className="table-wrapper">
            <h2>Recently Added Files</h2>
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
                        <div className="table-data has-no-cursor has-underline">
                          <em>
                            <img src={file_icon} alt="file" />
                          </em>
                          {row.fileName}
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
          </div>

          <div className="table-wrapper">
            <h2>Recently Modified Files</h2>
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
                        <div className="table-data has-no-cursor has-underline">
                          <em>
                            <img src={file_icon} alt="file" />
                          </em>
                          {row.fileName}
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
          </div>
        </div>
      </div>
      {/* Footer HTML Start*/}
      <Footer />
      {/* Footer HTML End*/}
    </>
  );
}
