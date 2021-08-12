import paciente from "../../assets/images/hogar.png"
import vacunacion from "../../assets/images/paciente.png"
import ver from "../../assets/images/ver.png"
import editar from "../../assets/images/usuario.png"
import eliminar from "../../assets/images/basura.png"
import './tablavacunacion.css';
import './cajavacunacion.css';
import {BrowserRouter as Router,Switch,Route,Link, NavLink, Redirect} from "react-router-dom";
import Swal from "sweetalert2";
import React, {useState, useEffect} from 'react';
import fireDb from "../../firebase";



const Tablavacunacion =()=> {

  const [data, setData] =  useState({});

  useEffect (()=>{

    fireDb.child("pacientes").on("value",(snapshot)=>{
      if(snapshot.val()!==null){
        setData({
          ...snapshot.val(),
        });
      } else{
        console.log(snapshot)
      }
    });

  },[]);

  const onDelete=(id) =>{
 Swal.fire({

  html:
   '<b style="color:red; font-size: 2em ">¿Está seguro de eliminar el registro? </b><br><span style="color:black"> "Ésta acción no se puede revertir!"</span></br>',
  width: 600,
  background: 'rgba(237, 240, 250) ',
  imageUrl: 'https://forjaempresas.com/wp-content/uploads/2020/08/Logos-01-1.png',
  showCancelButton: true,
  confirmButtonColor: '#d33',
  cancelButtonColor: '#F2692F',
  confirmButtonText: 'Eliminar!',
  cancelButtonText: 'Cancelar',

}).then((result) => {
  if (result.isConfirmed) {
  deletPaciente (id)
  }
})
  };

  const deletPaciente =(id) =>{
      
      fireDb.child(`pacientes/${id}`).remove((err) => {
        if (err){
          console.log(err);
         Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'error');
         
        }
        else{
       Swal.fire({

        html: '<b style="color:black">Registro eliminado con éxito</b>',
        icon: 'success',
        background: 'rgba(237, 240, 250) ',
      }
      );
        }
      });
  };
  return (
    <div className="tablapaciente">

    <div className="cajavacunacion">

    <div id="botones1" >
    
    <div className="paciente">
    <a href="dashboard" style={{textDecoration: 'none', color: "white"}}><img src={paciente} alt="usuario" width="100px"/><p>Inicio</p></a>
  </div>

    <div className="vacunacion">
    <a href="paciente" style={{textDecoration: 'none', color: "white"}}><img src={vacunacion} alt="usuario" width="100px"/><p>Paciente</p></a>
   </div>

    </div>
   
    <div className="barras">

 
    <button className="registropaciente" type="submit"><a href="registrovacuna" style={{textDecoration: 'none', color: "white"}}>Nuevo registro vacunación</a></button>
   

    
     <form className="d-flex2">
        <input className="form-control me-2" type="search" placeholder="Número de Identificación" aria-label="Search"/>
        <button className="barrabusqueda" type="submit">Buscar</button>
      </form>
     

      </div>

    </div>


    <div>
      <p className="listadopacientes"><span>Pacientes</span> Vacunados</p>
        <div id="div1">
             <table border="1">
     
      <thead >
      <tr>
      <th id="columnat">Paciente</th>
      <th >Número de identificación</th>
      <th >Nombre Completo</th>
      <th id="columnat">Edad</th>
      <th >Teléfono</th>
      <th >Dirección</th>
      <th >Correo electrónico</th>
      
     <th id="columnat">Ver más detalles</th>
      <th id="columnat">Editar</th>
     <th id="columnat">Eliminar</th>
      </tr>
      </thead>
      <tbody>
      {Object.keys(data).map((id, index) => {
        return(
         <tr key={id}> 
         <td>{index + 1}</td>
         <td >{data[id].numidentificacion}</td>
         <td>{data[id].nombre}</td>
         <td>{data[id].edad}</td>
         <td>{data[id].nummovil}</td>
         <td>{data[id].direccion}</td>
         <td>{data[id].correo}</td>
        
         
         

         <td><Link to={`/Viewvacuna/${id}`}><img src={ver} alt="masdetalles" width="30px"/></Link></td>
        <td><Link to={`/update2/${id}`}><img src={editar} alt="editarpaciente" width="30px"/></Link></td>
        <td><img src={eliminar} alt="eliminarpaciente" width="30px" onClick={()=> onDelete(id)} /></td>

         </tr>
        )

        })}
     
     


      </tbody>
      </table>


      </div>





     </div>
     </div>
  );
}

export default Tablavacunacion;
