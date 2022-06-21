import React from 'react'
import "./landing.css";
import { Grid, Paper } from "@material-ui/core";
import {useHistory} from "react-router-dom"
function Landing() {
  let history = useHistory()
  return (
    <div className='landing-container'>
         <p className='landing-header'>Welcome</p>
<Grid container>
<Grid item xs={6}>
<Paper

style={{
  width: "60vh",
  height: "100 auto",
  boxShadow: "0 5px 10px rgba(0, 0, 0, 0.39)",
  padding: "10px 50px 50px",
  
}}
>
<button className='landing-login' onClick={() =>{
  history.push("/login")
}}>Login</button>
<button className='landing-signup' onClick={() =>{
  history.push("/signup")
}}>Sign Up</button>  
</Paper>
</Grid>
</Grid>
</div>
  )
}

export default Landing