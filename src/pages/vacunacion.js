import React from 'react';
import ReactDOM from 'react-dom';

import Header from "../components/header/header";
import Nav from "../components/nav/nav";

import Tablavacunacion from "../components/tablavacunacion/tablavacunacion";
import Footer from "../components/footer/footer";

function Vacunacion() {
  return (
    <div>
     <Header />
     <Tablavacunacion />
     <Footer />

     </div>
  );
}

export default Vacunacion;