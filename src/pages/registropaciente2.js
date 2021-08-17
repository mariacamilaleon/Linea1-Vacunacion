import '../components/registropaciente/registropaciente.css';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {useHistory, useParams} from "react-router-dom";
import {BrowserRouter as Router,Switch,Route,Link, NavLink, Redirect} from "react-router-dom";
import fireDb from "../firebase";
import {isEmpty} from "lodash";




const Registropaciente =()=> {

  const values = {
    nombre: "",
    tipodocumento: "",
    numidentificacion: "",
    fechanacimiento: "",
    edad:"",
    sexo:"",
    rh:"",
    regimen:"",
    eps:"",
    nacionalidad:"",
    localidad:"",
    barrio:"",
    direccion:"",
    correo:"",
    numlocal:"",
    nummovil:"",
    enfermedad:"",
    otraenfermedad:"",
    alergias:"",
    aque:"",
    sexo:"",
  };

  const [data, setData] =  useState({});
  const [initialState, setState] = useState(values);
  
  const [checked, setChecked] = useState({
    femenino:false,
    masculino:false,
    intersexual:false,
  });



  const{sexo, nombre, tipodocumento, numidentificacion, fechanacimiento, edad, rh, regimen, eps, nacionalidad, localidad, barrio, direccion, correo, numlocal, nummovil, enfermedad, otraenfermedad, alergias, aque} = initialState;

  const history = useHistory ();

  let currentId = useParams();
  const {id} = currentId;

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

  },[id]);

 useEffect(()=>{
  if (isEmpty(id)){
    setState({...values});
  } else{
    setState({...data[id]});
  }
 },[id,data]);



  const handleSubmit = (e) =>{
    e.preventDefault();
    if(isEmpty(id)){

       fireDb.child("pacientes").push(initialState, (err) =>{
      if(err){
        console.log(err);
      }
    });

    } else{
       fireDb.child(`/pacientes/${id}`).set(initialState, (err) =>{
      if(err){
        console.log(err);
      }
    });
    }
   
    history.push("/paciente");
  };



  const handleInputChange = (e) =>{
    let{ name, value } = e.target; 
    setState({
      ...initialState,
      [name]: value,
    });

  };

  const handleInputChangeRadio = (e)=>{
    let{ name } = e.target; 
   if(name==='masculino'){
    setChecked({
      masculino:true,
      femenino:false,
      intersexual:false,
    })
    setData({
      ...data,
      sexo:`${name}`
    })
   }

   if(name==='femenino'){
    setChecked({
      masculino:false,
      femenino:true,
      intersexual:false,
    })
    setData({
      ...data,
      sexo:`${name}`
    })
   }

   if(name==='intersexual'){
    setChecked({
      masculino:false,
      femenino:false,
      intersexual:true,
    })
    setData({
      ...data,
      sexo:`${name}`
    })
   }

  };


  return (
    <div className="container-fluid">
      <div className="row">
         <div className ="col-md-6">
           <form onSubmit={handleSubmit}>
           <div className= "form-group">
           <label>Nombre Completo</label>
           <input type="text" 
           className="form-control" 
           value={nombre}
           name="nombre"
           onChange={handleInputChange}
           />
           </div>

           <div className="form-group">
           <label>Tipo de documento</label>
           <input type="text" 
           className="form-control" 
           value={tipodocumento}
           name="tipodocumento"
           onChange={handleInputChange}
           />
           </div>

           <div className= "form-group">
           <label>Número de Identificación</label>
           <input type="number" 
           className="form-control" 
           value={numidentificacion}
           name="numidentificacion"
           onChange={handleInputChange}
           />
           </div>

           <div className= "form-group">
           <label>Fecha de nacimiento</label>
           <input type="text" 
           className="form-control" 
           value={fechanacimiento}
           name="fechanacimiento"
           onChange={handleInputChange}
           />
            </div>

              <div className= "form-group">
           <label>Edad</label>
           <input type="text" 
           className="form-control" 
           value={edad}
           name="edad"
           onChange={handleInputChange}
           />
            </div>

            <div className= "form-group">
           <label>Sexo</label>
           <input type="radio" 
           className="custom-control-input"
           name="femenino"
           checked={checked.femenino}
           onChange={handleInputChangeRadio}
           />
           <span className="custom-control-label"> femenino</span>


           <input type="radio" 
           className="custom-control-input"
           name="masculino"
           checked={checked.masculino}
           onChange={handleInputChangeRadio}
           />
            <span className="custom-control-label"> masculino</span>            

             <input type="radio" 
           className="custom-control-input"
           name="intersexual"
           checked={checked.intersexual}
           onChange={handleInputChangeRadio}
           />
            <span className="custom-control-label"> intersexual</span>           


             </div>


              <div className= "form-group">
           <label>RH</label>
           <input type="text" 
           className="form-control" 
           value={rh}
           name="rh"
           onChange={handleInputChange}
           />
            </div>

            <div className= "form-group">
           <label>Régimen de salud</label>
           <input type="text" 
           className="form-control" 
           value={regimen}
           name="regimen"
           onChange={handleInputChange}
           />
            </div>



            <div className= "form-group">
           <label>EPS</label>
           <input type="text" 
           className="form-control" 
           value={eps}
           name="eps"
           onChange={handleInputChange}
           />
            </div>


            <div className= "form-group">
           <label>Nacionalidad</label>
           <input type="text" 
           className="form-control" 
           value={nacionalidad}
           name="nacionalidad"
           onChange={handleInputChange}
           />
            </div>            


            <div className= "form-group">
           <label>Localidad</label>
           <input type="text" 
           className="form-control" 
           value={localidad}
           name="localidad"
           onChange={handleInputChange}
           />
            </div>


            <div className= "form-group">
           <label>Barrio</label>
           <input type="text" 
           className="form-control" 
           value={barrio}
           name="barrio"
           onChange={handleInputChange}
           />
            </div>


            <div className= "form-group">
           <label>Dirección</label>
           <input type="text" 
           className="form-control" 
           value={direccion}
           name="direccion"
           onChange={handleInputChange}
           />
            </div>


            <div className= "form-group">
           <label>Correo electrónico</label>
           <input type="email" 
           className="form-control" 
           value={correo}
           name="correo"
           onChange={handleInputChange}
           />
            </div>


            <div className= "form-group">
           <label>Teléfono local</label>
           <input type="number" 
           className="form-control" 
           value={numlocal}
           name="numlocal"
           onChange={handleInputChange}
           />
            </div>


            <div className= "form-group">
           <label>Teléfono movil</label>
           <input type="text" 
           className="form-control" 
           value={nummovil}
           name="nummovil"
           onChange={handleInputChange}
           />
            </div>


            <div className= "form-group">
           <label>Enfermedades preexistentes</label>
           <input type="text" 
           className="form-control" 
           value={enfermedad}
           name="enfermedad"
           onChange={handleInputChange}
           />
            </div>


            <div className= "form-group">
           <label>Otra enfermedad</label>
           <input type="text" 
           className="form-control" 
           value={otraenfermedad}
           name="otraenfermedad"
           onChange={handleInputChange}
           />
            </div>


            <div className= "form-group">
           <label>alergias</label>
           <input type="text" 
           className="form-control" 
           value={alergias}
           name="alergias"
           onChange={handleInputChange}
           />
            </div>


            <div className= "form-group">
           <label>¿A qué?</label>
           <input type="radio" 
           className="form-control" 
           value={aque}
           name="aque"
           onChange={handleInputChange}
           />
            </div>




          <button className="btn btn-default">Cancel</button>
           <button type = "submit" className="btn btn-success btn-raised">Submit</button>

           </form>
      </div>

    </div>
     </div>
  );
}

export default Registropaciente;

