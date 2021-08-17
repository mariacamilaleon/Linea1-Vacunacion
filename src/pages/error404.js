import React from 'react';
import ReactDOM from 'react-dom';
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Error from "../assets/images/error404.jpg"; 
import {BrowserRouter as Router,Switch,Route,Link, NavLink, Redirect} from "react-router-dom";
import "../components/error404/error404.css";


function Error404() {
  return (
    <>
    <Header />
     <div className="container-error">
          <Link to={`/dashboard`} style={{textDecoration: 'none'}}><h2 className="tituloerror">Página No Encontrada<br></br>IR A INICIO</h2></Link>
        <img src={Error}  />
          
    </div>
    <Footer />
    </>
  );
}

export default Error404;


