import paciente from "../../assets/images/hogar.png"
import vacunacion from "../../assets/images/vacunacion.png"
import ver from "../../assets/images/ver.png"
import editar from "../../assets/images/usuario.png"
import eliminar from "../../assets/images/basura.png"
import './tablapaciente.css';
import './cajapaciente.css';
import {BrowserRouter as Router,Switch,Route,Link, NavLink, Redirect} from "react-router-dom";
import Swal from "sweetalert2";
import React, {useState, useEffect} from 'react';
import fireDb from "../../firebase";



const Tablapaciente =()=> {

  const [searchTerm, setsearchTerm] = useState("");

 const values = {
     numidentificacion: "",
     };

 const [data, setData] =  useState({});
 const [initialState, setState] = useState(values);
 const{ numidentificacion} = initialState;



 
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
      });
        }
      });
  };


  return (

     <div className="tablapaciente">

 <div className="cajapaciente">

    <div id="botones1" >
    
    <div className="paciente">
    <NavLink to="dashboard" activeClassName="active" style={{textDecoration: 'none', color: "white"}}><img src={paciente} alt="usuario" width="100px"/><p>Inicio</p></NavLink>
  </div>

    <div className="vacunacion">
    <NavLink to="vacunacion" activeClassName="active"  style={{textDecoration: 'none', color: "white"}}><img src={vacunacion} alt="usuario" width="100px"/><p>Vacunación</p></NavLink>
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
      <p className="listadopacientes"><span>Listado</span> Pacientes</p>
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
      {Object.keys(data).filter((val) =>{
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
         <td>{data[id].direccion}</td>
         <td>{data[id].correo}</td>
         
         
         

         <td><Link to={`/Viewpaciente/${id}`}><img src={ver} alt="masdetalles" width="30px"/></Link></td>
        <td><Link to={`/update/${id}`}><img src={editar} alt="editarpaciente" width="30px"/></Link></td>
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

export default Tablapaciente;

