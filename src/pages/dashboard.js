import React from 'react';
import ReactDOM from 'react-dom';

import Header from "../components/header/header";
import Nav from "../components/nav/nav";
import Tabladashboard from "../components/tabladashboard/tabladashboard";
import Footer from "../components/footer/footer";


function Dashboard() {
  return (
    <div>
     <Header />
     <Tabladashboard />
     <Footer />

     </div>
  );
}

export default Dashboard;

