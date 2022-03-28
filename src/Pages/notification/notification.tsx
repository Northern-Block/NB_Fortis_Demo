import * as React from "react";
import axios from 'axios';
import { useState } from "react";
import { Container, Divider, Stack, } from "@mui/material"
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from "@mui/icons-material/Add"
import {
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import "./notification.scss";

export default function Notification() {

  const [emailError, setEmailError] = useState(false)
  const [Error, setError] = useState([])
  const [inputFields, setInputFields] = useState([
    {
      email: "",
      id: 0,
      invalid: false
    }
  ])

  React.useEffect(() => {
    var element = document.getElementsByClassName("active")[0];
    if (element) {
      element.classList.remove("active");
    }
  }, [])

  const emailValidation = (email: any) => {

    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!email || regex.test(email) === false) {
      return false;
    }
    return true;
  }
  const handleSubmit = async (e: any) => {
    console.log(inputFields, 'fi')
    let test = false
    e.preventDefault()


  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, index: number) => {
    const values: any = [...inputFields]
    console.log("momo", values)
    // values=event.target.value
    values[index][event.target.name] = event.target.value

    setInputFields(values)
    console.log(inputFields)
  }


  // adds new input
  const handleAdd = () => {

    setInputFields([
      ...inputFields,
      {
        email: "",
        id: inputFields.length,
        invalid: false
      },
    ])

  }

  const handleBlur = (event: any, item: any) => {
    console.log(item, '--->item',)
    let temp = item
    let state = inputFields
    if (!emailValidation(item.email)) {

      item.invalid = true
      for (let i = 0; i < state.length; i++) {
        if (state[i].id == temp.id) {

          state[i].invalid = true
        }

      }
      setInputFields([...state])
    }
    else {
      item.invalid = false
      for (let i = 0; i < state.length; i++) {
        if (state[i].id == temp.id) {

          state[i].invalid = false
        }

      }
      setInputFields([...state])

    }
    console.log(emailValidation(item.email))
  }
  // removes input
  const handleRemove = (item: any, index: any) => {
    console.log(item, 'item')
    console.log(index, 'i')
    let i = parseInt(index, 10)
    console.log(i, 'i')
    if (inputFields.length !== 1) {
      const values = [...inputFields]
      values.splice(index, 1)
      setInputFields(values)
    }
  }


  return (
    <>
      <div className="wrapper">
        <div className="main-content ">
          <Container maxWidth="xs">
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>

                <p>Please enter all email addresses that should be notified when a file has been compromised.</p>

                {inputFields.map((item, index) => (
                  <div key={index}  >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                      <TextField
                        id="outlined-error-helper-text"
                        //  label="Error"
                        name="email"
                        required
                        fullWidth

                        label="Email"
                        onChange={(event) => handleChange(event, index)}
                        value={item.email}
                        error={item.invalid}
                        onBlur={(event) => handleBlur(event, item)}
                      />
                      {
                        index !== inputFields.length - 1 ?

                          <IconButton onClick={() => handleRemove(item, index)}>
                            <RemoveIcon />
                          </IconButton>
                          :
                          <IconButton onClick={handleAdd} >
                            <AddIcon />
                          </IconButton>
                      }

                    </div>
                    {
                      inputFields[index].invalid && <p style={{ color: 'red' }}>Please enter a valid email</p>
                    }

                  </div>
                ))}

                <Button type="submit" variant="contained" disableElevation >
                  Save
                </Button>
                <Button disableElevation>Cancel</Button>
              </Stack>
            </form>
          </Container>
        </div></div>
    </>

  )
}



