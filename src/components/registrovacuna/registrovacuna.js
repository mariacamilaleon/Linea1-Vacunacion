import './registrovacuna.css';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {useHistory, useParams} from "react-router-dom";
import {BrowserRouter as Router,Switch,Route,Link, NavLink, Redirect} from "react-router-dom";
import fireDb from "../../firebase";
import {isEmpty} from "lodash";
import Swal from "sweetalert2";



const Registrovacuna =()=> {

  const values = {
    idpaciente:"",
    nombre: "",
    edad:"",
    covid:"NO",
    contactocovid:"NO",
    sintomascovid:"NO",
    cuales:"",
    nombrevacuna:"",
    tipovacuna:"",
    fechadosis1:"",
    doctordosis1:"",
    establecimientodosis1:"",
    fechadosis2:"",
    doctordosis2:"",
    establecimientodosis2:"", 
   
  };

  const [data, setData] =  useState({});
  const [initialState, setState] = useState(values);
  



  const{idpaciente, nombre,  edad, covid, contactocovid, sintomascovid, cuales, nombrevacuna, tipovacuna, fechadosis1, doctordosis1, establecimientodosis1, fechadosis2, doctordosis2, establecimientodosis2} = initialState;

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


const onRegister=(id) =>{
 Swal.fire({

  html:
   '<b style="color:black; font-size: 2em ">Datos de vacunación registrados con éxito</b></br><b style="color:red; font-size: 1.5em ">¿Desea continuar en la página de vacunación o  ir a la página de inicio? </b>',
  width: 600,
  background: 'rgba(237, 240, 250) ',
  imageUrl: 'https://forjaempresas.com/wp-content/uploads/2020/08/Logos-01-1.png',
  showCancelButton: true,
  confirmButtonColor: '#d33',
  cancelButtonColor: '#F2692F',
  confirmButtonText: 'Vacunacion!',
  cancelButtonText: 'Inicio',

}).then((result) => {
  if (result.isConfirmed) {
    history.push("/vacunacion")
  }
  if (!result.isConfirmed) {
    history.push("/dashboard")
  }
})
  };

  const handleSubmit = (e) =>{

     /*let iravacuna = e.target.querySelector('').value
    let irapaciente = e.target.querySelector('').value*/

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
   
  onRegister(id);

  };



  const handleInputChange = (e) =>{
    let{ name, value } = e.target; 
    setState({
      ...initialState,
      [name]: value,
    });


    };




(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()



  return (

    <div className="container-fluid">
      <div className="row min-vh-100">
       <div className="containeregistro2 col-12">
           <div>
             <Link to={`/vacunacion`}><button type="submit"  className="botonregresar">Regresar</button></Link>
           </div>
           <div className="titulo">
            <h1>Vacunación</h1>
           </div>
           <div className="cajafor">
          
               <form className="formulario needs-validation" name="formulariop" method="get" action="url" noValidate onSubmit={handleSubmit}>
                 
                       <div className="col-sm-12 col-md-3 col-lg-4 mt-3">
                            <label id="renglon" className="control-label " htmlFor="id">ID Paciente: </label>
                            <input className="inputid" placeholder="ID" id="idpaciente" type="number" name="idpaciente" value={idpaciente} onChange={handleInputChange}/>
                       </div>
                       <div className="row">
                           <div className="col-sm-12 col-md-9 col-lg-8 mt-3">
                                <label id="renglonpaciente" className="control-label " htmlFor="nombre">Nombre paciente: </label>
                                <input type="text" className="inputnom"  id="nombre2" value={nombre} placeholder="Nombre completo" name="nombre" onChange={handleInputChange} required/>
                           </div>

                           <div className="col-sm-12 col-md-3 col-lg-4 mt-3">
                               <label id="renglon" className="control-label " htmlFor="edad">Edad paciente: </label>
                               <input className="inputid" placeholder="" type="text" name="edad" id="edad" value={edad} onChange={handleInputChange} required/>
                           </div>
                     </div>
                     <br></br>
                     <h5 className="datosformulario3"><span>ANTECEDENTES</span> COVID-19</h5>
                     <br></br>
                   <div className="card mb-3" >
                          <div className="row g-0">
                               <div className="col-md-6">
                                      <label id="renglonantecedentes" htmlFor="antecedentes">¿Ha sido confirmado con COVID-19 con prueba de laboratorio PCR en los últimos 3 meses?: </label>
                               </div>
                               <div className="col-md-6">
                                  <div className="card-antecedentes">
                                         <div className="form-check form-check-inline">
                                            <input className="form-check-input punto" type="radio" name="covid" id="covid" value="SI" required="required"  onChange={handleInputChange} required/> 
                                            <label className="form-check-label" htmlFor="inlineCheckbox1">SI</label>
                                         </div>
                                         <div className="form-check form-check-inline">
                                            <input className="form-check-input punto" type="radio" name="covid" id="covid" value="NO" required="required"  onChange={handleInputChange} required/> 
                                            <label className="form-check-label" htmlFor="inlineCheckbox2">NO</label>
                                         </div>
                                  </div>
                               </div>
                         </div>
                  </div>
                    <div className="card mb-3" >
                          <div className="row g-0">
                               <div className="col-md-6">
                                    <label id="renglonantecedentes" htmlFor="antecedentes">¿Ha estado en contacto con personas que tengan COVID-19?: </label>
                               </div>
                               <div className="col-md-6">
                                  <div className="card-antecedentes">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input punto" type="radio" name="contactocovid" id="contactocovid" value="SI" required="required"  onChange={handleInputChange} required/> 
                                            <label className="form-check-label" htmlFor="inlineCheckbox1">SI</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input punto" type="radio" name="contactocovid" id="contactocovid" value="NO" required="required"  onChange={handleInputChange} required/> 
                                            <label className="form-check-label" htmlFor="inlineCheckbox2">NO</label>
                                        </div>
                                  </div>
                               </div>
                          </div>
                   </div>
                   <div className="card mb-3" >
                          <div className="row g-0">
                               <div className="col-md-6">
                                      <label id="renglonantecedentes" htmlFor="antecedentes">¿Ha tenido síntomas relacionados con COVID-19?: </label>
                               </div>
                               <div className="col-md-6">
                                  <div className="card-antecedentes">
                                         <div className="form-check form-check-inline">
                                           <input className="form-check-input punto" type="radio" name="sintomascovid" id="sintomascovid" value="SI" required="required"  onChange={handleInputChange}/> 
                                           <label className="form-check-label" htmlFor="inlineCheckbox1">SI</label>
                                         </div>
                                         <div className="form-check form-check-inline">
                                           <input className="form-check-input punto" type="radio" name="sintomascovid" id="sintomascovid" value="NO" required="required" onChange={handleInputChange}/> 
                                           <label className="form-check-label" htmlFor="inlineCheckbox2">NO</label>
                                         </div>
                                  </div>
                               </div>
                          </div>
                </div>
                      <div className="row">
                         <div className="col-sm-12 col-md-12 col-lg-12 mt-3">
                             <label id="rengloncuales" className="control-label " htmlFor="cuales">¿Cuáles?: </label>
                             <input type="text" className="inputcuales"  placeholder="" name="cuales" id="cuales" value={cuales} onChange={handleInputChange} />
                         </div>
                      </div>
              <br></br>
              <br></br>
                   <h5 className="datosformulario3"><span>INFORMACIÓN</span> VACUNA</h5>
                   <br></br>
                   <h5 className="datosformulario2"><span className="datosformulario2-2">PRIMERA</span> DOSIS</h5>

                   <div className="row">
                       <div className="col-sm-12 col-md-6 col-lg-6 mt-3">
                            <label id="renglon" className="control-label " htmlFor="nombrevacuna">Nombre: </label>
                            <select className="inputnomtipo form-select" name="nombrevacuna" id="nombrevacuna" value={nombrevacuna} onChange={handleInputChange} required>    
                                <option selected disabled value="">Seleccione nombre</option>
                                 <option value="Pfizer">Pfizer</option>
                                 <option value="Sinovac">Sinovac</option>
                                 <option value="Janssen">Janssen</option>
                                 <option value="Moderna">Moderna</option>
                                 <option value="Astrazeneca">Astrazeneca</option>
                            </select> 
                          <div className="valid-feedback">Campo OK</div>
                          <div className="invalid-feedback">Complete los datos</div>                         
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 mt-3">
                           <label id="renglontipo" className="control-label " htmlFor="tipo">Tipo: </label>
                            <select className="inputnomti form-select" name="tipovacuna" id="tipovacuna" value={tipovacuna} onChange={handleInputChange} required>    
                                   <option selected disabled value="">Seleccione tipo</option>
                                   <option value="ARN">ARN</option>
                                   <option value="Virus inactivo">Virus inactivo</option>
                                   <option value="Vector Viral no replicante">Vector Viral no replicante</option>
                                   <option value="Mrna">Mrna</option>
                            </select>
                            <div className="valid-feedback">Campo OK</div>
                            <div className="invalid-feedback">Complete los datos</div>
                        </div>
                    </div>
                     
                     <div className="row">
                       <div className="col-sm-12 col-md-12 col-lg-12 mt-3">
                           <label id="renglonfedosis" htmlFor="fechaapli">Fecha de aplicación:</label>
                           <input className="inputfecha" id="fechadosis1" type="date" name="fechadosis1" value={fechadosis1} onChange={handleInputChange} required/>
                           <div className="valid-feedback">Campo OK</div>
                           <div className="invalid-feedback">Complete los datos</div>
                       </div>
                     </div>
                     <div className="row">
                       <div className="col-sm-12 col-md-12 col-lg-12 mt-3">
                            <label id="renglonfecha" className="control-label " htmlFor="profesional">profesional: </label>
                            <input type="text" className="inputnom3" id="doctordosis1" name="doctordosis1" value={doctordosis1} onChange={handleInputChange} placeholder="Nombre y apellido" required/>
                            <div className="valid-feedback">Campo OK</div>
                            <div className="invalid-feedback">Complete los datos</div>
                         </div>
                     </div>
          
             <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12 mt-3">
                          <label id="renglonaplicacion" htmlFor="lugar">Lugar de aplicación: </label>
                     <select className="inputselectlugar form-select form-selectlugar" name="establecimientodosis1" id="establecimientodosis1" value={establecimientodosis1} onChange={handleInputChange} required>    
                       <option selected disabled value="">Seleccione lugar</option>
                       <option value="Plaza de las Américas">Plaza de las Américas</option>
                       <option value="Plaza Imperial">Plaza Imperial</option>
                       <option value="Compensar Avenida 68">Compensar Avenida 68</option>
                       <option value="Centro comercial Galerías">Centro comercial Galerías</option>
                       <option value="Centro comercial Mallplaza">Centro comercial Mallplaza</option>
                       <option value="Centro Mayor centro comercial">Centro Mayor centro comercial</option>
                       <option value="Centro comercial Dorado Plaza">Centro comercial Dorado Plaza</option>
                       <option value="Coliseo Metropolitano Tunal">Coliseo Metropolitano Tunal</option>
                       <option value="Coliseo Cayetano Cañizares">Coliseo Cayetano Cañizares</option>
                       <option value="Coliseo Tibabuyes">Coliseo Tibabuyes</option>
                       <option value="Coliseo La Palestina">Coliseo La Palestina</option>
                       <option value="Biblioteca Tintal">Biblioteca Tintal</option>
                       <option value="Movistar Arenas">Movistar Arenas</option>
                       <option value="Corferias">Corferias</option>
                       <option value="Aeropuerto">Aeropuerto</option>
                       <option value="Carpa Gran Estación">Carpa Gran Estación</option>
                       <option value="Plaza de los Artesanos">Plaza de los Artesanos</option>
                       <option value="Unidad de Servicios Vista Hermosa">Unidad de Servicios Vista Hermosa</option>
                     </select>
                     <div className="valid-feedback">Campo OK</div>
                     <div className="invalid-feedback">Complete los datos</div>
                 </div>       
              </div>
                     <br></br>
                   <h5 className="datosformulario2"><span className="datosformulario2-2">SEGUNDA</span> DOSIS</h5>
                    <div className="row">
                       <div className="col-sm-12 col-md-12 col-lg-12 mt-3">
                           <label id="renglonfedosis2" htmlFor="fechaapli">Fecha de aplicación:</label>
                               <input className="inputfecha2" id="fechadosis2" type="date" name="fechadosis2" value={fechadosis2} onChange={handleInputChange} required/>
                       <div className="valid-feedback">Campo OK</div>
                       <div className="invalid-feedback">Complete los datos</div>
                       </div>
                     </div>
                     <div className="row">
                       <div className="col-sm-12 col-md-12 col-lg-12 mt-3">
                            <label id="renglonprofesional" className="control-label " htmlFor="profesional">profesional: </label>
                            <input type="text" className="inputnom3" id="doctordosis2" name="doctordosis2" value={doctordosis2} onChange={handleInputChange} placeholder="Nombre completo" required/>
                         <div className="valid-feedback">Campo OK</div>
                         <div className="invalid-feedback">Complete los datos</div>
                         </div>
                     </div>
          
             <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12 mt-3">
                        <label id="renglonlugar" htmlFor="lugar">Lugar de aplicación: </label>
                     <select className="inputlugar form-select form-selectlugar" name="establecimientodosis2" id="establecimientodosis2" value={establecimientodosis2} onChange={handleInputChange} required>    
                       <option selected disabled value="">Seleccione lugar</option>
                       <option value="Plaza de las Américas">Plaza de las Américas</option>
                       <option value="Plaza Imperial">Plaza Imperial</option>
                       <option value="Compensar Avenida 68">Compensar Avenida 68</option>
                       <option value="Centro comercial Galerías">Centro comercial Galerías</option>
                       <option value="Centro comercial Mallplaza">Centro comercial Mallplaza</option>
                       <option value="Centro Mayor centro comercial">Centro Mayor centro comercial</option>
                       <option value="Centro comercial Dorado Plaza">Centro comercial Dorado Plaza</option>
                       <option value="Coliseo Metropolitano Tunal">Coliseo Metropolitano Tunal</option>
                       <option value="Coliseo Cayetano Cañizares">Coliseo Cayetano Cañizares</option>
                       <option value="Coliseo Tibabuyes">Coliseo Tibabuyes</option>
                       <option value="Coliseo La Palestina">Coliseo La Palestina</option>
                       <option value="Biblioteca Tintal">Biblioteca Tintal</option>
                       <option value="Movistar Arenas">Movistar Arenas</option>
                       <option value="Corferias">Corferias</option>
                       <option value="Aeropuerto">Aeropuerto</option>
                       <option value="Carpa Gran Estación">Carpa Gran Estación</option>
                       <option value="Plaza de los Artesanos">Plaza de los Artesanos</option>
                       <option value="Unidad de Servicios Vista Hermosa">Unidad de Servicios Vista Hermosa</option>
                     </select>
                     <div className="valid-feedback">Campo OK</div>
                      <div className="invalid-feedback">Complete los datos</div>
              </div>       
         </div>
                     
             <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-9 mt-3">
                      <Link to={`/vacunacion`}><button  className="botoncerrar">CERRAR</button></Link>

                    </div>
                     <div className="col-sm-12 col-md-6 col-lg-3 mt-3">
                     <button type="submit"  className="botonregistrar"  >GUARDAR</button>
                    </div>
                   </div> 
             </form>
          </div>    
          </div>  
         </div>
  </div>

       

    );
}



export default Registrovacuna;



