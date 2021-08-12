
import './cardviewdashboard.css';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {useParams, Link} from "react-router-dom";
import fireDb from "../../firebase";



const Viewdashboard =()=> {

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

            <div className="cardcontainerview">
          
             <div>
             <Link to={`/dashboard`}><button  className="botonregresar">Regresar</button></Link>
           </div>

               <div className="cardview">

                  <h3 className="datosview1"><span>DATOS GENERALES</span> PACIENTE</h3>

                  <div className="card-bodyview">
            <p className="card-text">ID Paciente:<span className="parrafo">{data[id].idpaciente}</span></p>
            <p className="card-text">Nombre Completo:<span className="parrafo">{data[id].nombre}</span></p>
            <p className="card-text">Tipo de documento:<span className="parrafo">{data[id].tidocumento}</span></p>
            <p className="card-text">Número de identificación: <span className="parrafo">{data[id].numidentificacion}</span></p>
            <p className="card-text">Fecha de nacimiento: <span className="parrafo">{data[id].fechanacimiento}</span></p>
            <p className="card-text">Edad:<span className="parrafo"> {data[id].edad}</span></p>
            <p className="card-text">Sexo: <span className="parrafo">{data[id].sexo}</span></p>
            <p className="card-text">RH:<span className="parrafo">{data[id].rh}</span></p>
            <p className="card-text">Régimen de salud: <span className="parrafo">{data[id].regimen}</span></p>
            <p className="card-text">EPS: <span className="parrafo">{data[id].eps}</span></p>
            <p className="card-text">Nacionalidad:<span className="parrafo">{data[id].nacionalidad}</span></p>

            </div>

             <h5 className="datosview"><span>DATOS</span> DE RESIDENCIA</h5><br></br>
         <div className="card-bodyview">

            <p className="card-text">Localidad: <span className="parrafo">{data[id].localidad}</span></p>
            <p className="card-text">Barrio: <span className="parrafo">{data[id].barrio}</span></p>
            <p className="card-text">Dirección: <span className="parrafo">{data[id].direccion}</span></p>
            <p className="card-text">Correo electrónico: <span className="parrafo">{data[id].correo}</span></p>
            <p className="card-text">Teléfono local: <span className="parrafo">{data[id].numlocal}</span></p>
            <p className="card-text">Teléfono móvil: <span className="parrafo">{data[id].nummovil}</span></p>

</div>
          
           <h5 className="datosview"><span>ANTECEDENTES</span> CLÍNICOS</h5><br></br>
          <div className="card-bodyview">

            <p className="card-text">Enfermedades preexistentes: <span className="parrafo">{data[id].enfermedad}</span></p>
            <p className="card-text">Otra enfermedad: <span className="parrafo">{data[id].otraenfermedad}</span></p>
            <p className="card-text">Alergias: <span className="parrafo">{data[id].alergias}</span></p>
            <p className="card-text">¿A qué?: <span className="parrafo">{data[id].aque}</span></p>

            <p className="card-text">Ha sido confirmado con COVID?:<span className="parrafo"> {data[id].covid}</span></p>
            <p className="card-text">Profesional:<span className="parrafo"> {data[id].doctordosis1}</span></p>
              

             <h3 className="datosview1"><span>INFORMACIÓN</span> VACUNACION</h3><br></br>

            <p className="card-text">Ha sido confirmado con COVID?:<span className="parrafo"> {data[id].covid}</span></p>
            <p className="card-text">Ha estado en contacto con personas con  COVID?:<span className="parrafo"> {data[id].contactocovid}</span></p>
            <p className="card-text">Ha tenido sintomas relacionados con  COVID?:<span className="parrafo"> {data[id].sintomascovid}</span></p><br></br>
            
            <h5 className="datosformulario2"><span className="datosformulario2-2">PRIMERA</span> DOSIS</h5><br></br>
            <p className="card-text">Fecha primera dosis:<span className="parrafo"> {data[id].fechadosis1}</span></p>
            <p className="card-text">Profesional:<span className="parrafo"> {data[id].doctordosis1}</span></p>
            <p className="card-text">Vacuna:<span className="parrafo"> {data[id].nombrevacuna}</span></p>
            <p className="card-text">Tipo:<span className="parrafo"> {data[id].tipovacuna}</span></p>
            <p className="card-text">Establecimiento:<span className="parrafo">{data[id].establecimientodosis1}</span></p><br/> <br/>
           
            <h5 className="datosformulario2"><span className="datosformulario2-2">SEGUNDA</span> DOSIS</h5><br></br>
            <p className="card-text">Fecha segunda dosis:<span className="parrafo"> {data[id].fechadosis2}</span></p>
            <p className="card-text">Profesional:<span className="parrafo"> {data[id].doctordosis2}</span></p>
            <p className="card-text">Vacuna:<span className="parrafo"> {data[id].nombrevacuna}</span></p>
            <p className="card-text">Tipo:<span className="parrafo"> {data[id].tipovacuna}</span></p>
            <p className="card-text">Establecimiento:<span className="parrafo">{data[id].establecimientodosis2}</span></p>



              <Link to="/dashboard">
            <div>
             <button type="submit"  className="botonview">CERRAR</button>
           </div>
               
            </Link>

            </div>

            </div>
            </div>

            )
        }


        })}

  
     </div>
  );
}

export default Viewdashboard;

