import { createContext, useState } from "react";
import Axios from "axios"
export const UserContext = createContext();

function UserProvider (props){
    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserEmail, setCurrentUserEmail] = useState("");

     const getLoggedInUser = () =>{
        Axios.get("http://localhost:3005/login").then((response) =>{
            if(response.data.loggedIn==true){
              setCurrentUserName(response.data.user[0].fullname)
              setCurrentUserEmail(response.data.user[0].email)
            }      
          });
    }
 
    const allExports = { getLoggedInUser, currentUserName, currentUserEmail};

    return(
        <UserContext.Provider value={allExports}>
            {props.children}
        </UserContext.Provider>
     )
}

export default UserProvider;
