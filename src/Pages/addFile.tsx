import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"

import "antd/dist/antd.css"
import { Upload, message } from "antd"
import { InboxOutlined } from "@ant-design/icons"

import LeftBar from "./leftBar"
import "../App.css"

const { Dragger } = Upload

const AddFile = () => {
  const props = {
    name: "file",
    multiple: true,
    action: "https://jsonplaceholder.typicode.com/posts/",

    onChange(info: any) {
      const { status } = info.file
      console.log(status, "status")
      if (status !== "uploading") {
        console.log(info.file, info.fileList)
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e: any) {
      console.log("Dropped files", e.dataTransfer.files)
    }
  }
  return (
    <div>
      <Grid container justifyContent="space-around">
        <Grid item xs={3}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              paddingTop: "2rem",
              paddingLeft: "2rem"
            }}
          >
            <img src="../../Images/Fortis.PNG" alt="fortis" />
          </div>
          <LeftBar />
        </Grid>
        <Grid item xs={9}>
          <div
            style={{ width: "50%", paddingTop: "11rem", paddingLeft: "5rem" }}
          >
            <Dragger {...props} maxCount={1}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Dragger>
          </div>

          <div style={{ paddingTop: "20px" }}>
            <TextField
              label="Tag1, Tag2, Tag3"
              variant="outlined"
              style={{ marginRight: "40rem" }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginRight: "40rem",
              marginTop: "2rem"
            }}
          >
            <Button variant="contained">Upload</Button>
          </div>
        </Grid>
      </Grid>
      <div
        style={{
          backgroundColor: "grey",
          width: "80%",
          height: "3rem",
          marginLeft: "8rem",
          marginTop: "2rem",
          paddingBottom: "1rem"
        }}
      >
        <p style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>[Footer]</p>
      </div>
    </div>
  )
}
export default AddFile
