import Landing from "./component/landing/Landing";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";
import MyAccount from "./pages/myAccount/MyAccount";

function App() {
  return (
    <Router>
       <div className="App">

   
      <Switch>
      <Route exact path="/">
      <Landing/>
      </Route>

      <Route exact path="/signup">
      <SignUp/>
      </Route>

      <Route exact path="/login">
      <Login/>
      </Route>

      <Route exact path="/my-account">
      <MyAccount/>
      </Route>
      
      </Switch>
      </div>
      </Router>
    
  );
}

export default App;
