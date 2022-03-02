import { useState } from "react"
import { useHistory } from "react-router-dom"
import Button from "@mui/material/Button"

const Home: any = () => {
  const [text, setText] = useState<string>("")
  const history = useHistory()

  const handleSubmit = () => {
    history.push("/addfile")
  }

  return (
    <>
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
      <h1
        style={{
          display: "flex",
          alignItems: "flex-end",
          paddingLeft: "4rem",
          fontWeight: "700"
        }}
      >
        Welcome to Fortis.
      </h1>

      <div style={{ marginTop: "25rem" }}>
        <Button variant="contained" onClick={handleSubmit}>
          Login
        </Button>
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
    </>
  )
}

export default Home
