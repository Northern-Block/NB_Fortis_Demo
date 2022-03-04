import { useState } from "react"
import { useHistory } from "react-router-dom"
import Button from "@mui/material/Button"
import Logo from '../assets/image/sidebar_logo.png'
const Home: any = () => {
  const [text, setText] = useState<string>("")
  const history = useHistory()

  const data = {
    "message":"Present proof request",
     "data":{"@type":"did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/present-proof/1.0/request-presentation",
     "@id":"b3c1aa20-bc2d-4585-bbcd-07d5a1f19793",
     "~trace":{"target":"log","full_thread":true,
     "trace_reports":[]},
     "request_presentations_attach":[{"@id":"libindy-request-presentation-0",
     "mime-type":"application/json",
     "data":
      {"base64":"iVBORw0KGgoAAAANSUhEUgAAAMgAAADIAQAAAACFI5MzAAABGUlEQVR42u2YSw7DIAxEzYpjcFM+N+UYrErtMUkjpd2WWQQlyudtLI89JpH5a8lDHvJnUkVXmkMPKcMeAg1peo70inrpRbm/ISFDwkhNX4NUSWxEo26WVFKisgc2ArWncSO3OthJvEs0nTju/bOT+NJKzJK++c5OovJWRIob2AwNsf6YXWJ3eFGbgXS4skgEGafaDGSifVONS/ZCQ/Q2YI5l8BdSS0ImwtTezehjiM9C3FG8fbVdykft/URTeEY918hlIZZFC9Yq0Rw6ns63nyxXtkTCYK6VuJv4NKvmMdgFMBHfBbRjb8JFxgoWW04RPmKfEaY2pgcZcT/OsL3GQ5baFrUN23iZZrvJ6pKjDJFXFvL8P3jIfvIGvNX7jsCaJvEAAAAASUVORK5CYII="}}]},
     "success":true,"code":200
    }


  const handleSubmit = () => {
    history.push("/addfile")
  }

 
  let image =(data.data.request_presentations_attach[0].data.base64)

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
        <img src={Logo} alt="fortis" />
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
      <img src={"data:image/png;base64," + image} />

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
