


import './nav.css';
import React from "react";
import {BrowserRouter as Router,Switch,Route,Link, NavLink, Redirect} from "react-router-dom";

function Nav() {
  return (
  
     <nav className="menu">
  <ul>

      <li><NavLink to="/paciente" activeClassName="active" >Paciente</NavLink></li>
      

  
  <li><NavLink to="/vacunacion" activeClassName="active">  Vacunacion</NavLink></li>
</ul>

</nav>
  );
}


export default Nav;

