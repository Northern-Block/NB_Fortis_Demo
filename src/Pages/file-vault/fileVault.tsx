import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import Footer from "../../components/footer";
import {
  Button,
  InputAdornment,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars";
import "./file-vault.scss";
import user_icon from "../../assets/image/user_icon.png";
import search_icon from "../../assets/image/search_icon.svg";
import upload_icon from "../../assets/image/upload_icon.svg";
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

export default function FileVault() {
  return (
    <>
      {/* Header HTML Start*/}
      <Header />
      {/* Header HTML End*/}

      {/* Sidebar HTML Start*/}
      <Sidebar />
      {/* Sidebar HTML End*/}
      <div className="wrapper">
        <div className="main-content file-vault">
          <div className="file-search">
            <div className="search-left">
              <p>Select Files to request</p>
              <TextField
                fullWidth
                label="Search File"
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
              <Button variant="outlined">
                Click or Drag to Add New File{" "}
                <em>
                  <img src={upload_icon} alt="upload" />
                </em>
                <input type="file" />
              </Button>

              <div className="pagination-wrapper">
                <p>1-50 of 1005</p>
                <Pagination count={10} />
              </div>
            </div>
          </div>
          <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            autoHeight
            autoHeightMin={0}
            autoHeightMax={500}
            thumbMinSize={30}
            universal={true}
            renderTrackVertical={(props) => (
              <div {...props} className="track-vertical" />
            )}
          >
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
                    {rows.map((row) => (
                      <TableRow>
                        <TableCell>
                          <div className="table-data">
                            <em>
                              <img src={file_icon} alt="file" />
                            </em>
                            {row.fileName}
                          </div>
                        </TableCell>
                        <TableCell>{row.owner}</TableCell>
                        <TableCell>
                          <p className="description-message">
                            {row.description}
                          </p>
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
          </Scrollbars>
        </div>
      </div>
      {/* Footer HTML Start*/}
      <Footer />
      {/* Footer HTML End*/}
    </>
  );
}
