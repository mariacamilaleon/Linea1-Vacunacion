
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Paciente from "./pages/paciente";
import Vacunacion from "./pages/vacunacion";
import Registropaciente from "./pages/registropaciente";
import Registrovacunacion from "./pages/registrovacuna";
import Viewpaciente from "./pages/Viewpaciente";
import Viewvacuna from "./pages/Viewvacuna";
import Viewdashboard from "./pages/Viewdashboard";
import Error404 from "./pages/error404";
import React from "react";
import {BrowserRouter as Router,Switch,Route,Link, Navlink, Redirect} from "react-router-dom";



function App() {
  return (

         <div id="container-fluid overflow-hidden">
    <Router>
        
         <Switch>
           <Route exact path="/" render={() => (<Redirect to="/home"/>)}>
          </Route>

            <Route exact path="/home">
            <Login/>
          </Route>

           <Route exact path="/dashboard">
            <Dashboard/>
          </Route>


          <Route exact path="/paciente">
            <Paciente/>
          </Route>

           <Route exact path="/vacunacion">
            <Vacunacion/>
          </Route>

           <Route exact path="/registropaciente">
            <Registropaciente/>
          </Route>

           <Route exact path="/update/:id">
            <Registropaciente/>
          </Route>

               <Route exact path="/update2/:id" >
            <Registrovacunacion/>
          </Route>

           <Route exact path="/registrovacuna">
            <Registrovacunacion/>
          </Route>


           <Route exact path="/Viewpaciente/:id">
            <Viewpaciente/>
          </Route>

            <Route exact path="/Viewvacuna/:id">
            <Viewvacuna/>
          </Route>

           <Route exact path="/Viewdashboard/:id">
            <Viewdashboard/>
          </Route>

          <Route  exact path="*" component={Error404}/>
       </Switch>
   
    </Router>
    </div>

  );
}

export default App;





