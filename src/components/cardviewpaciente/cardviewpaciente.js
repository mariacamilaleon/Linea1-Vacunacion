
import './cardviewpaciente.css';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {useParams, Link} from "react-router-dom";
import fireDb from "../../firebase";



const Viewpaciente =()=> {

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
             <Link to={`/paciente`}><button  className="botonregresar">Regresar</button></Link>
           </div>

          
               <div className="cardview">

                  <h5 className="datosview1"><span>DATOS</span> BÁSICOS PACIENTE</h5>

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

             <h5 className="datosview1"><span>DATOS</span> DE RESIDENCIA</h5>
         <div className="card-bodyview">

            <p className="card-text">Localidad: <span className="parrafo">{data[id].localidad}</span></p>
            <p className="card-text">Barrio: <span className="parrafo">{data[id].barrio}</span></p>
            <p className="card-text">Dirección: <span className="parrafo">{data[id].direccion}</span></p>
            <p className="card-text">Correo electrónico: <span className="parrafo">{data[id].correo}</span></p>
            <p className="card-text">Teléfono local: <span className="parrafo">{data[id].numlocal}</span></p>
            <p className="card-text">Teléfono móvil: <span className="parrafo">{data[id].nummovil}</span></p>
</div>
          
           <h5 className="datosview1"><span>ANTECEDENTES</span> CLÍNICOS</h5>
          <div className="card-bodyview">

            <p className="card-text">Enfermedades preexistentes: <span className="parrafo">{data[id].enfermedad}</span></p>
            <p className="card-text">Otra enfermedad: <span className="parrafo">{data[id].otraenfermedad}</span></p>
            <p className="card-text">Alergias: <span className="parrafo">{data[id].alergias}</span></p>
            <p className="card-text">¿A qué?: <span className="parrafo">{data[id].aque}</span></p>
            
              <Link to="/paciente">
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

export default Viewpaciente;

