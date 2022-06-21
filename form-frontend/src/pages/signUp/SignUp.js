import { Grid, Paper } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { signValidation } from '../../Validation'
import "./signUp.css"
import Axios from "axios";
import {useHistory} from "react-router-dom"
import { UserContext, getLoggedInUser } from '../../component/contextFile/UserContext';
function SignUp() {
  let history = useHistory();
  const [error, setError] = useState({});
  const [correctData, setCorrectData] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");

  const [signUpValue, setSignUpValue] = useState({
    name: "",
    email: "",
    password: ""
  });

  const {getLoggedInUser} = useContext(UserContext);
 
  Axios.defaults.withCredentials = true;

  useEffect(() =>{
    getLoggedInUser();
  })


  //inserting data to user table
//passing values to our backend   
const insertUser = () =>{
    //retrieving user from database and checking if user input for email matches with any email indatabase
    Axios.get ("http://localhost:3005/getUser")
    .then(response=>{
      response.data.forEach(val=>{
        if(signUpValue.email == val.email){
          setLoginStatus("User already exist")
        }else if(signUpValue.email !== val.email){
          Axios.post ("http://localhost:3005/create", {
              fullname: signUpValue.name,
              email: signUpValue.email,
              password: signUpValue.password,
            }).then (() => {
               history.push('/my-account');
            });
        }
      })
    })
}
 
  const handleSubmit = (e) =>{
    e.preventDefault();
    setError(signValidation(signUpValue));
    setCorrectData(true);
    if (Object.keys(error).length === 0 && correctData){
      insertUser();
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
            <p className='login-header'>Sign Up</p>
            <label className='form-label'>Full Name</label>
            
            <input className='form-input' id = {error.name ? "input-error" : "form-input"}
            value={signUpValue.name}
            onChange={(e) =>{
              setSignUpValue({...signUpValue, name: e.target.value})
            }}/>
             {error.name && <p className='log-error'> {error.name}</p>}
           
            <label className='form-label'>Email</label>
            
            <input className='form-input' id = {error.email ? "input-error" : "form-input"}
            value={signUpValue.email}
            onChange={(e) =>{
              setSignUpValue({...signUpValue, email: e.target.value})
            }}/>
             {error.email && <p className='log-error'> {error.email}</p>}
             {<p className='login-status'>{loginStatus}</p>}

            <label className='form-label'>Password</label>
            <input className='form-input'
            type= "password"
            id = {error.password ? "input-error" : "form-input"}
             value={signUpValue.password}
             onChange={(e) =>{
              setSignUpValue({...signUpValue, password: e.target.value})
             }}/>
             {error.password && <p className='log-error'> {error.password}</p>}

            <button className='form-login-btn'>Sign Up</button>
            <p className='has-an-account'>Already have an account? <a href='/login'>Login</a></p>
          </form>
        </div>
        </Paper>
        </Grid>
        </Grid>  
    </div>
  )
}

export default SignUp