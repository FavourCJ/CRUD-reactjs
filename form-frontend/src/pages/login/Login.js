import { Grid, Paper } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { loginValidation } from '../../Validation'
import { useHistory } from 'react-router-dom';
import {getLoggedInUser, UserContext} from "../../component/contextFile/UserContext"
import Axios from "axios"
import "./login.css"

function Login() {

  let history = useHistory();
  const [error, setError] = useState({});
  const [correctData, setCorrectData]=useState(false);
  const [loginStatus, setLoginStatus] = useState("");
  const [formValue, setFormValue] = useState({
    email: "",
    password: ""
  });
  const {getLoggedInUser} = useContext(UserContext);
 
  Axios.defaults.withCredentials = true;

  useEffect(() =>{
    getLoggedInUser();
  })

//log user into account
const logintoAccount = () =>{
  Axios.get ("http://localhost:3005/getUser")
  .then(response =>{
    response.data.forEach(val=>{
      if(formValue.email !== val.email){
        setLoginStatus("No user found")
      }else if(formValue.email === val.email){
        setLoginStatus("")
        Axios.post ("http://localhost:3005/login", {
    email: formValue.email,
    password: formValue.password,
  }).then ((response) => {
    if(response.data.message){
      setLoginStatus(response.data.message)
    }else{
       history.push("/my-account")
    }})
      }
    })
  })
}

  const handleSubmit = (e) =>{
    e.preventDefault();
    setError(loginValidation(formValue));
    setCorrectData(true);
    if (Object.keys(error).length === 0 && correctData){
     logintoAccount();
    }
  }
  return (
   
    <div className='login-container'>
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
        <div className='form'>
          <form onSubmit={handleSubmit}>
            <p className='login-header'>Login</p>
            <label className='form-label'>Email</label>
            
            <input className='form-input' id = {error.email ? "input-error" : "form-input"}
            value={formValue.email}
            onChange={(e) =>{
              setFormValue({...formValue, email: e.target.value})
            }}/>
             {error.email && <p className='log-error'> {error.email}</p>}
            
            <label className='form-label'>Password</label>
            <input className='form-input'
            type="password"
            id = {error.password ? "input-error" : "form-input"}
             value={formValue.password}
             onChange={(e) =>{
               setFormValue({...formValue, password: e.target.value})
             }}/>
             {error.password && <p className='log-error'> {error.password}</p>}
            {<p className='login-status'>{loginStatus}</p>}

            <button className='form-login-btn'>Login</button>
            <p className='has-an-account'>Do not have an account? <a href='/signUp'>Sign Up</a></p>
          </form>
        </div>
        </Paper>
        </Grid>
        </Grid>  
    </div>
  )
}

export default Login