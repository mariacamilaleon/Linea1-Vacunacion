
import './cardviewvacuna.css';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {useParams, Link} from "react-router-dom";
import fireDb from "../../firebase";



const Viewvacuna =()=> {

   const [data, setData] =  useState({});


  let currentId = useParams();
  const {id} = currentId;


 useEffect (()=>{

    fireDb.child("pacientes").on("value",(snapshot)=>{
      if(snapshot.val()!==null){
        setData({
          ...snapshot.val(),
        });
      } else{
        snapshot({});
      }
    });

  },[id]);


  return (
    <div className="container mt-5">
      {Object.keys(data).map((userId)=>{
        if(userId === id){

          return(

            <div className="containerview2">
                <div>
                  <Link to={`/vacunacion`}><button  className="botonregresar">Regresar</button></Link>
                </div>
                <div className="row min-vh-100">
                  <div className="cajaizq col-12 col-md-4 col-lg-4">
                    <div className="cardatos">
                        <div className="card-bodyview2">
                          <p className="card-text">ID Paciente:<span className="parrafo">{data[id].idpaciente}</span></p>
                          <p className="card-text">Nombre Completo:<span className="parrafo">{data[id].nombre}</span></p>
                          <p className="card-text">Edad:<span className="parrafo"> {data[id].edad}</span></p>
                        </div>
                        <h5 className="datosview2"><span>ANTECEDENTES</span> COVID-19</h5>
                        <div className="card-bodyview2">
                          <p className="card-text">¿Ha sido confirmado  con COVID-19 con prueba de
                            laboratorio PCR en los últimos 3 meses?:<span className="parrafo"> {data[id].covid}</span></p>
                          <p className="card-text">¿Ha estado en contacto con personas que tengan COVID-19?:<span className="parrafo"> {data[id].contactocovid}</span></p>
                          <p className="card-text">¿Ha tenido síntomas relaciondos con COVID-19?:<span className="parrafo"> {data[id].sintomascovid}</span></p>
                        </div>
                    </div>
                 </div>
                 <div className="cajader col-12 col-md-8 col-lg-8">
                     <div className="cardosis1">
                        <h5 className="datosviewdosis"><span>PRIMERA</span> DOSIS</h5>
                        <table className="table">
                         <thead>
                          <tr>
                            <th scope="col"><p className="card-text">Vacuna<br></br><span className="parrafo"> {data[id].nombrevacuna}</span></p></th>
                            <th scope="col"><p className="card-text">Tipo<br></br><span className="parrafo"> {data[id].tipovacuna}</span></p></th>
                            <th scope="col"><p className="card-text">Fecha aplicación<br></br><span className="parrafo"> {data[id].fechadosis1}</span></p></th>
                          </tr>
                         </thead>
                       </table>
                       <table className="table">
                         <thead>
                           <tr>
                             <th scope="col"><p className="card-text">Profesional<br></br><span className="parrafo"> {data[id].doctordosis1}</span></p></th>
                             <th scope="col"><p className="card-text">Establecimiento<br></br><span className="parrafo">{data[id].establecimientodosis1}</span></p></th>
                             <th scope="col"></th>
                           </tr>
                         </thead>
                       </table> 
                   </div>
                   <div className="cardosis2">
                      <h5 className="datosviewdosis"><span>SEGUNDA</span> DOSIS</h5>
                       <table className="table">
                        <thead>
                          <tr>
                            <th scope="col"><p className="card-text">Vacuna<br></br><span className="parrafo"> {data[id].nombrevacuna}</span></p></th>
                            <th scope="col"><p className="card-text">Tipo<br></br><span className="parrafo"> {data[id].tipovacuna}</span></p></th>
                            <th scope="col"><p className="card-text">Fecha aplicación<br></br><span className="parrafo"> {data[id].fechadosis2}</span></p></th>
                          </tr>
                        </thead>
                       </table>
                       <table className="table">
                          <thead>
                            <tr>
                              <th scope="col"><p className="card-text">Profesional<br></br><span className="parrafo"> {data[id].doctordosis2}</span></p></th>
                              <th scope="col"><p className="card-text">Establecimiento<br></br><span className="parrafo">{data[id].establecimientodosis2}</span></p></th>
                              <th scope="col"></th>
                            </tr>
                          </thead> 
                       </table>
                       <Link to="/vacunacion">
                   <div>
                     <button type="submit"  className="botonview2">CERRAR</button>
                   </div>
               </Link>
                 </div>
               </div>
           </div>
               
                 
       </div>
              

            )
        }


        })}

  
     </div>
  );
}

export default Viewvacuna;

