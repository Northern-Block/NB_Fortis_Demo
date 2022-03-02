import React from 'react'
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

export default function LeftBar() {
  return (
    <div>
        <Typography style={{paddingTop:'2rem',marginRight:'9rem',fontWeight:'600'}}>
          Welcome Kris
        </Typography>
        <div style={{border:'2px  solid black',height:'22rem',paddingTop:'2rem',width:'8rem',marginLeft:'2rem',marginTop:'3rem' }}>
          <Link to="/addfile" > <Typography>Add File</Typography></Link >
          <Link to ="/search"> <Typography>Request File</Typography></Link>
          <Link to="/update"> <Typography>Modify File</Typography></Link >
        </div>
    </div>
  )
}
