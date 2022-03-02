import React, { useState } from "react"
import AddFile from "./addFile"
import SearchFile from "./SearchFile"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import { Link } from "react-router-dom"
import Typography from "@mui/material/Typography"
import LeftBar from "./leftBar"
import "../App.css"

export default function Update() {
  const [data, setData] = useState([
    "File_name_1",
    "File_name_2",
    "File_name_3",
    "File_name_4",
    "File_name_5"
  ])
  const [searchTerm, setSearchterm] = useState("")
  const handleTextChange = (e: any) => {
    console.log(e.target.value)
  
    setSearchterm(e.target.value)
  }
  return (
    <div>
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
              className="search"
              style={{
                width: "250px",
                paddingLeft: "10px",
                paddingTop: "12rem"
              }}
            >
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                label="Search"
                onChange={handleTextChange}
              />

              <div style={{ paddingTop: "20px" }}>
                {data
                  .filter((val) => {
                    if (searchTerm == "") {
                      return val
                    } else if (
                      val
                        .toLocaleLowerCase()
                        .includes(searchTerm.toLocaleLowerCase())
                    ) {
                      return val
                    }
                  })
                  .map((item) => (
                    <div
                      style={{
                        fontSize: "1rem",
                        display: "flex",
                        flexDirection: "column"
                      }}
                    >
                      <Link
                        to="/modify"
                        style={{ color: "black" }}
                        className="div_hover"
                      >
                        {item}
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
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
