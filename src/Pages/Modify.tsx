import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import "antd/dist/antd.css"

import { Upload, message } from "antd"
import { InboxOutlined } from "@ant-design/icons"

import LeftBar from "./leftBar"

const { Dragger } = Upload

export default function Modify() {
  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
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
      <Grid container>
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
            style={{
              paddingTop: "11rem",
              paddingLeft: "5rem",
              display: "flex"
            }}
          >
            <p
              style={{
                border: "1px solid  #1890ff",
                marginRight: "2rem",
                width: "200px",
                height: "200px",
                paddingTop: "5rem",
                borderStyle: "dotted"
              }}
            >
              Preview
            </p>

            <div>
              <Dragger {...props}>
                <p
                  className="ant-upload-drag-icon"
                  style={{ height: "94% !important" }}
                >
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint"></p>
              </Dragger>
            </div>
          </div>

          <div style={{ paddingTop: "20px" }}>
            <TextField
              label="Comments regardings changes "
              variant="outlined"
              style={{ width: "27rem", marginRight: "26rem" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginRight: "30rem",
              marginTop: "2rem"
            }}
          >
            <Button variant="contained">Submit</Button>
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
