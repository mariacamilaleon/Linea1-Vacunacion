import ver from "../../assets/images/ver.png"
import vacuna from "../../assets/images/vacunacion2.png"
import paciente from "../../assets/images/paciente.png"
import vacunacion from "../../assets/images/vacunacion.png"
import './cajadashboard.css';
import './tabladashboard.css';
import {BrowserRouter as Router,Switch,Route,Link, NavLink, Redirect} from "react-router-dom";
import Swal from "sweetalert2";
import React, {useState, useEffect} from 'react';
import fireDb from "../../firebase";



const Tabladashboard =()=> {


  const [searchTerm, setsearchTerm] = useState("");

 const values = {
   
    numidentificacion: "",
   
  };

 const [data, setData] =  useState({});
 const [initialState, setState] = useState(values);
 const{ numidentificacion} = initialState;
const [filteredData, setFilteredData]= useState([]);


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

  const handleInputChange = (e) =>{
    let{ name, value } = e.target;
    if(name==="numidentificacion"){
      setsearchTerm(value)
    } 
    else{
    setState({
      ...initialState,
      [name]: value,

    });

     }
    
    };
    

  const onDelete=(id) =>{
    if(window.confirm("Está seguro de que quiere eliminar este dato?")){
      fireDb.child(`pacientes/${id}`).remove((err) => {
        if (err){
          console.log(err);
        }
      });

    }

  };

  return (
    <div className="tablapaciente">

<div className="caja">

    <div id="botones1" >
    
    <div className="paciente">
    <a href="paciente" style={{textDecoration: 'none', color: "white"}}><img src={paciente} alt="usuario" width="100px"/><p>Paciente</p></a>
  </div>

    <div className="vacunacion">
    <a href="vacunacion" style={{textDecoration: 'none', color: "white"}}><img src={vacunacion} alt="usuario" width="100px"/><p>Vacunación</p></a>
   </div>

    </div>
   
   <div className="barras">

 
    <button className="registropaciente" type="submit"><NavLink to="/registropaciente" style={{textDecoration: 'none', color: "white"}}>Registro Nuevo Paciente</NavLink></button>
   

    
     <form className="d-flex2">
     
     
        <input className="form-control me-2" 
        type="search"
        value={searchTerm} 
        autocomplete="list"
        placeholder="Número de Identificación" 
        aria-label="Search"
        name="numidentificacion"

        onChange={handleInputChange}
         />

          
                 <button className="barrabusqueda" type="submit">Buscar</button>
         
        
             
      </form>
     

      </div>

    </div>


    <div>
      <p className="listadopacientes"><span>Información General</span> Pacientes</p>
        <div id="div1">
             <table border="1">
     
      <thead >
      <tr>
      <th id="columnat">Paciente</th>
      <th >Número de identificación</th>
      <th >Nombre Completo</th>
      <th id="columnat">Edad</th>
      <th >Teléfono</th>
      <th >Correo electrónico</th>
      <th>Sintomatología</th>
      <th>Laboratorio</th>
      <th>Fecha segunda dosis</th>

      
     <th id="columnat">Ver más detalles</th>
      <th id="columnat">Vacuna</th>
     
      </tr>
      </thead>
      <tbody>

      {data?(Object.keys(data).filter((val) =>{
        if (searchTerm === ""){
          return val;
        } else {
          return data[val].numidentificacion?.includes(searchTerm)
          }

      }).map((id, index) => {
        return(
         <tr key={id}> 
         <td>{index + 1}</td>
         <td>{data[id].numidentificacion}</td>
         <td>{data[id].nombre}</td>
         <td>{data[id].edad}</td>
         <td>{data[id].nummovil}</td>
         <td>{data[id].correo}</td>
         <td>{data[id].sintomascovid}</td>
         <td>{data[id].nombrevacuna}</td>
         <td>{data[id].fechadosis2}</td>

         
         

        <td><Link to={`/Viewdashboard/${id}`}><img src={ver} alt="masdetalles" width="30px"/></Link></td>
         <td><Link to={`/update2/${id}`}><img src={vacuna} alt="vacuna" width="30px"/></Link></td>
        

         </tr>
        )

        })):
        <div>("No hay registro, desea registrar nuevo paciente?")</div>
        } 
        


      </tbody>
      </table>


      </div>





     </div>
     </div>
  );
}

export default Tabladashboard;

