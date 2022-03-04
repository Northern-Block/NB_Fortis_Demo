import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"

// import Sidebar from "../components/sidebar"

export default function Modify() {
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
          {/* <Sidebar /> */}
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
