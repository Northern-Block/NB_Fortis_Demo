import { useState } from "react"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import LeftBar from "./leftBar"
import "../App.css"

const SearchFile = () => {
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
          <div>
            <LeftBar />
          </div>
        </Grid>
        <Grid item xs={9}>
          <div
            className="search"
            style={{ width: "250px", paddingLeft: "10px", paddingTop: "12rem" }}
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
                    <a href="" className="div_hover" style={{ color: "black" }}>
                      {item}
                    </a>
                  </div>
                ))}
            </div>
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
export default SearchFile
