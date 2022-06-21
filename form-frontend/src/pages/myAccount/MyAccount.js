import React, { useContext, useEffect, useState } from 'react'
import "./myAccount.css";
import { Grid, Paper } from '@material-ui/core';
import Axios from 'axios';
import { UserContext, getLoggedInUser } from '../../component/contextFile/UserContext';
import {useHistory} from "react-router-dom"

function MyAccount() {
 
  const {getLoggedInUser, currentUserName, currentUserEmail} = useContext(UserContext);
  Axios.defaults.withCredentials = true;
  let history = useHistory();
  const [showEditName, setShowEditName] = useState(false);
  const [editName, setEditName] = useState()

   //deleting user's account
  const deleteAccount = () =>{
    Axios.delete(`http://localhost:3005/delete/${currentUserEmail}`);
    history.push("/signUp");
  }

  //show edit account details
  const showEditDetails =() =>{
    setShowEditName(true);
   }

  //edit account details
  const editAccountDetails = () =>{
    Axios.put("http://localhost:3005/update/", {
      fullname: editName,
      email: currentUserEmail
    })
      window.location.reload(false);
  }

  //log user out
  const logout = () =>{
    Axios.defaults.withCredentials = false;
    history.push("/login")
  }

  useEffect(() =>{
    getLoggedInUser();
  })

  return (

     <div>
      {showEditName ? 
      <div className='edit-profile-container'> 
      <div> 
      <div>
       <p className='login-header'>Profile</p>
       <label className='my-account-label'>Full name:</label>
       <p className='my-account-p'>  {currentUserName}</p>

       <label className='my-account-label'>Email:</label>
       <p className='my-account-p'>{currentUserEmail} </p>
    
       <button className='log-out'>Logout</button>
       <button className='edit-profile' onClick={showEditDetails}>Edit Profile</button>
       <button className='delete-my-account' onClick={deleteAccount}>Delete my account</button>
     </div>
        </div>
         <div>
       <p className='edit-user-header'>Edit Profile</p>
       <label className='my-account-label'>Full name:</label>
       <input 
         className='edit-my-account-p' 
         value={editName}
         onChange = {(e)=>{
          setEditName(e.target.value)
         }}/>
         
       <label className='edit-my-account-label'>Email:</label>
       <p className='my-account-p'>{currentUserEmail} </p>
    

        <button className='edit-profile' onClick={editAccountDetails}>Edit Profile</button>
    
      </div>
      </div>

      : 
      <div className='my-account-container' >
      <Grid container>
     <Grid item xs={6}>
     <Paper
     style={{
       width: "70vh",
       height: "100 auto",
       boxShadow: "0 5px 10px rgba(0, 0, 0, 0.39)",
       padding: "10px 50px 50px",
       
     }}>

     <div>
     <p className='login-header'>My Account</p>
       <label className='my-account-label'>Full name:</label>
       <p className='my-account-p'>  {currentUserName}</p>

       <label className='my-account-label'>Email:</label>
       <p className='my-account-p'>{currentUserEmail} </p>
    
       <button className='log-out' onClick={logout}>Logout</button>
       <button className='edit-profile' onClick={showEditDetails}>Edit Profile</button>
       <button className='delete-my-account' onClick={deleteAccount}>Delete my account</button>
     </div>
     </Paper>  
    </Grid>
    </Grid>
    </div>}
     </div>
    
  )
}

export default MyAccount