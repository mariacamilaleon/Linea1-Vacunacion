import './registropaciente.css';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {useHistory, useParams} from "react-router-dom";
import {BrowserRouter as Router,Switch,Route,Link, NavLink, Redirect} from "react-router-dom";
import fireDb from "../../firebase";
import Autocomplete from 'react-autocomplete';
import {isEmpty} from "lodash";
import Swal from "sweetalert2";
import axios from "axios";



const Registropaciente =()=> {


const [nacionalidades, setNacionalidades]=useState([])


const getNacionalidades= ()=> {
  axios
  .get("https://countriesnow.space/api/v0.1/countries/population")
  .then((response) => {
    console.log(response.data.data);
    setNacionalidades(response.data.data)
  })
  .catch((error) => {
    console.log(error);
  });
}


  const values = {
    idpaciente:"",
    nombre: "",
    tidocumento: "",
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
    alergias:"NO",
    aque:"",
    
   
  };

  const [data, setData] =  useState({});
  const [initialState, setState] = useState(values);
  



  const{idpaciente, nombre, tidocumento, numidentificacion, fechanacimiento, edad, sexo, rh, regimen, eps, nacionalidad, localidad, barrio, direccion, correo, numlocal, nummovil, enfermedad, otraenfermedad, alergias, aque} = initialState;

  const history = useHistory ();

  let currentId = useParams();
  const {id} = currentId;

 useEffect (()=>{

    getNacionalidades()

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
   '<b style="color:black; font-size: 2em ">Paciente Registrado con ??xito</b></br><b style="font-size: 1.5em ">??Desea hacer el registro de vacunaci??n? </b>',
  width: 600,
  background: 'rgba(237, 240, 250) ',
  imageUrl: 'https://forjaempresas.com/wp-content/uploads/2020/08/Logos-01-1.png',
  showCancelButton: true,
  confirmButtonColor: '#d33',
  cancelButtonColor: '#F2692F',
  confirmButtonText: 'Ir a Vacunaci??n',
  cancelButtonText: 'Ir a Paciente',

}).then((result) => {
  if (result.isConfirmed) {
     history.push("/vacunacion")
  }
  if (!result.isConfirmed) {
    history.push("/paciente")
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
       <div className="containeregistro1 col-12">
           <div>
             <Link to={`/paciente`}><button  className="botonregresar">Regresar</button></Link>
           </div>
           <div className="titulo">
            <h1>Informaci??n Paciente</h1>
           </div>
           <div className="cajafor">
          
               <form onSubmit={handleSubmit} className="formulario needs-validation" name="formulariop" method="get" action="url" noValidate>
                 
                 <h5 className="datosformulario"><span>DATOS</span> B??SICOS</h5>

                 <div className="row">
                    <div className="col-sm-12 col-md-9 col-lg-8 mt-3">
                        <label id="renglon" className="control-label " htmlFor="nombre">Nombre completo: </label>
                        <input type="text" className="inputnom" id="nombre" value={nombre} placeholder="Nombre completo" name="nombre" pattern="[A-z??????????????????????????????????\s]{3,35}" onChange={handleInputChange} required="required" />
                        <div className="valid-feedback">Campo OK</div>
                        <div className="invalid-feedback">Entre 3 y 35 letras, no n??meros ni caracteres especiales</div>    
                    </div>
                    <div className="col-sm-12 col-md-3 col-lg-4 mt-3">
                        <label id="renglon" className="control-label " htmlFor="ID">ID Paciente: </label>
                        <input className="inputid" placeholder="ID" id="idpaciente" type="text" name="idpaciente" value={idpaciente} onChange={handleInputChange}/>
                    </div>
                 </div>

                 <div className="row">
                   <div className="col-sm-12 col-md-9 col-lg-7 mt-3">
                      <label id="renglon2" htmlFor="tidocumento"> Tipo de identificaci??n: </label>
                     <select className="inputselect form-select" name="tidocumento" id="tidocumento" value={tidocumento}  onChange={handleInputChange} required>    
                       <option selected disabled value="">Seleccione un Tipo de Documento</option>
                       <option value="NUIP">N??mero ??nico de identificaci??n personal (NUIP)</option>
                       <option value="Tarjeta de Identidad">Tarjeta de Identidad (TI)</option>
                       <option value="C??dula de Ciudadania">C??dula de Ciudadania</option>
                       <option value="Pasaporte">Pasaporte</option>
                       <option value="C??dula de Extranjeria">C??dula de Extranjeria</option>
                     </select>
                     <div className="valid-feedback">Campo OK</div>
                        <div className="invalid-feedback">Complete el campo</div>
                   </div>
                   <div className="col-sm-12 col-md-3 col-lg-5 mt-3">  
                      <label id="renglon2" htmlFor="identificacion">N??mero de identificaci??n: </label>
                      <input className="inputnum" type="text" id="numidentificacion" name="numidentificacion" value={numidentificacion} size="20" maxLength="20" value={numidentificacion} pattern="[A-z\0-9]{1,15}" onChange={handleInputChange} required/>
                      <div className="valid-feedback">Campo OK</div>
                      <div className="invalid-feedback">El valor debe tener entre 5 y 25 caracteres</div> 
                   </div>
                 </div>

                 <div className="row">
                   <div className="col-sm-12 col-md-9 col-lg-9 mt-3">
                      <label id= "renglon3" className="form-label" htmlFor="fecha">Fecha de Nacimiento:</label>
                       <input className="inputfechapaci" id="fechanacimiento" type="date" name="fechanacimiento" value={fechanacimiento} onChange={handleInputChange} required/>
                      <div className="valid-feedback">Campo OK</div>
                      <div className="invalid-feedback">Complete el campo</div>
                   </div>
                   <div className="col-sm-12 col-md-3 col-lg-3 mt-3">
                      <label id="renglon" className="control-label " htmlFor="edad">Edad paciente: </label>
                      <input className="inpute" placeholder="" type="number" name="edad" id="edad" value={edad} onChange={handleInputChange} pattern="[0-9]{1,15}" required/>
                      <div className="valid-feedback">Campo OK</div>
                      <div className="invalid-feedback">El valor debe ser num??rico</div>
                   </div>
                 </div>
                 <br></br>

                 <div className="row">
                   <div className="col-sm-12 col-md-9 col-lg-9 mt-3">
                       <label id="renglonsex" htmlFor="sexo">Sexo: </label>
                        <div className=" form-check-inline form-checkpaci ">
                            <input className="form-check-input punto " type="radio" name="sexo" id="sexo" value="femenino"  required="required"  onChange={handleInputChange} required/> 
                            <label className="form-check-label " htmlFor="inlineCheckbox1">femenino</label>    
                        </div>


                        <div className=" form-check-inline form-checkpaci">
                            <input className="form-check-input punto " type="radio" name="sexo" id="sexo" value="masculino"  required="required"   onChange={handleInputChange} required/> 
                            <label className="form-check-label " htmlFor="inlineCheckbox2">masculino</label>
                         </div>

                         <div className=" form-check-inline form-checkpaci">
                            <input className="form-check-input punto " type="radio" name="sexo" id="sexo" value="intersexual"  onChange={handleInputChange} required/> 
                            <label className="form-check-label " htmlFor="inlineCheckbox3">intersexual</label>                          
                        </div>
                         
                   </div>

                   <div className="col-sm-12 col-md-3 col-lg-3 mt-3">
                     <label id="renglonrh" className="control-label " htmlFor="rh">RH: </label>
                        <select className="inputer form-select" name="rh" id="rh" value={rh} onChange={handleInputChange} required>    
                       <option selected disabled value="">RH</option>
                       <option value="O-">O-</option>
                       <option value="O+">O+</option>
                       <option value="A-">A-</option>
                       <option value="A+">A+</option>
                       <option value="B-">B-</option>
                       <option value="B+">B+</option>
                       <option value="AB-">AB-</option>
                       <option value="AB+">AB+</option>
                     </select>
                     <div className="valid-feedback">Campo OK</div>
                     <div className="invalid-feedback">Complete el campo</div>
                   </div>
                 </div>

                 <div className="row">
                   <div className="col-sm-12 col-md-12 col-lg-6 mt-3">
                      <label id="renglon4" htmlFor="regimen">R??gimen de salud:</label>
                     <select className="inputselect2paci form-selectpaci" name="regimen" id="regimen" value={regimen} onChange={handleInputChange} required>    
                       <option selected disabled value="">Seleccione r??gimen</option>
                       <option value="Contributivo">Contributivo (RC)</option>
                       <option value="Subsidiado">Subsidiado (RS)</option>
                     </select>
                     <div className="valid-feedback">Campo OK</div>
                      <div className="invalid-feedback">Complete el campo</div>
                   </div>
                   <div className="col-sm-12 col-md-12 col-lg-6 mt-3">
                      <label id="renglon4" htmlFor="eps">Eps afiliaci??n:</label>
                     <select className="inputselect2paci form-selectpaci" name="eps" id="eps" value={eps} onChange={handleInputChange} required>    
                       <option selected disabled value="">Seleccione EPS</option>
                       <option value="Fondo Financiero Distrital de salud">Fondo Financiero Distrital de salud</option>
                       <option value="Caja Familiar de Compensaci??n del Huila">Caja Familiar de Compensaci??n del Huila(TI)</option>
                       <option value="E.P.S Sanitas S.A">E.P.S Sanitas S.A</option>
                       <option value="Capital Salud E.P.S SAS">Capital Salud E.P.S SAS</option>
                       <option value="Fondo Pasivo Social de Ferrecarriles Nacionales">Fondo Pasivo Social de Ferrecarriles Nacionales</option>
                       <option value="Caja de Compensaci??n Familiar Cordoba">Caja de Compensaci??n Familiar Cordoba-COMFACOR</option>
                       <option value="Salud Colpatria S.A Entidad Promotora de Salud">Salud Colpatria S.A Entidad Promotora de Salud</option>
                       <option value="Alianza Medell??n Antioquia Eps S.A.S">Alianza Medell??n Antioquia Eps S.A.S</option>
                       <option value="Caja de Compensaci??n Familiar Cundinamarca- COMFACUNDI">Caja de Compensaci??n Familiar Cundinamarca- COMFACUNDI</option>
                       <option value="Caja de Compensaci??n Familiar del Oriente Colombiano - COMFAORIENTE">Caja de Compensaci??n Familiar del Oriente Colombiano - COMFAORIENTE</option>
                       <option value="Coomeva Entidad Promotora de Salud S.A., Coomeva E.P.S S.A.">Coomeva Entidad Promotora de Salud S.A., Coomeva E.P.S S.A.</option>
                       <option value="Selvasalud S.A Eps-S En Liquidaci??n Forzosa Administrativa">Selvasalud S.A Eps-S En Liquidaci??n Forzosa Administrativa</option>
                       <option value="Caja de Compensaci??n Familiar de la Guajira - COMFAGUAJIRA">Caja de Compensaci??n Familiar de la Guajira - COMFAGUAJIRA</option>
                       <option value="Caja de Compensaci??n de Nari??o">Caja de Compensaci??n de Nari??o</option>
                       <option value="Famisanar Ltda. Cafam - Colsubsidio E.P.S">Famisanar Ltda. Cafam - Colsubsidio E.P.S</option>
                       <option value="Compensar EPS">Compensar EPS</option>
                       <option value="Asociaci??n Mutual Ser Empresa Solidaria de Salud E.S.S">Asociaci??n Mutual Ser Empresa Solidaria de Salud E.S.S</option>
                       <option value="Asociaci??n Mutual Empresa Solidaria de Salud de Nari??o">Asociaci??n Mutual Empresa Solidaria de Salud de Nari??o</option>
                       <option value="Entidad Promotora de Salud Servicio Occidental de Salud S.A S.O.S">Entidad Promotora de Salud Servicio Occidental de Salud S.A S.O.S</option>
                       <option value="Ecopetrol S.A.">Ecopetrol S.A</option>
                       <option value="AudiSalud">AudiSalud</option>
                       <option value="Cooperativa de Salud y Desarrollo Integral Zona Sur Oriental de Cartagena ltda,- Coosalud E.S.S">Cooperativa de Salud y Desarrollo Integral Zona Sur Oriental de Cartagena ltda,- Coosalud E.S.S</option>
                       <option value="Saludvida E.P.S S.A">Saludvida E.P.S S.A</option>
                       <option value="EMDISALUD">EMDISALUD</option>
                       <option value="Caja de Compensaci??n Familiar Cajacopi Atl??ntico">Caja de Compensaci??n Familiar Cajacopi Atl??ntico</option>
                       <option value="Fiduciaria La Previsora S.A. -Fiduprevisora S.A">Fiduciaria La Previsora S.A. -Fiduprevisora S.A</option>
                       <option value="ASSO">ASSO</option>
                       <option value="Nueva Empresa Promotora de Salud S.A Sigla Nueva Eps S.A.">Nueva Empresa Promotora de Salud S.A Sigla Nueva Eps S.A.</option>
                       <option value="EPS CONVIDA">EPS CONVIDA</option>
                       <option value="Mallamas EPSI">Mallamas EPSI</option>
                       <option value="Direcci??n de Sanidad Polic??a Nacional">Direcci??n de Sanidad Polic??a Nacional</option>
                       <option value="Asociaci??n de Cabildos del Cesar y Guajira DUSAKAWI ARSI">Asociaci??n de Cabildos del Cesar y Guajira DUSAKAWI ARSI</option>
                     </select>
                     <div className="valid-feedback">Campo OK</div>
                     <div className="invalid-feedback">Complete el campo</div>
                   </div>
                 </div>
                 <div className="row">
                   <div className="col-sm-12 col-md-12 col-lg-8 mt-3">
                      <label id="renglonacion" htmlFor="nacionalidad">Nacionalidad:</label>
                     <select className="inputselect3 form-select" name="nacionalidad" id="nacionalidad" value={nacionalidad} onChange={handleInputChange}required>
                      <option value={0}>Seleccione el pa??s</option>
                      {
                        nacionalidades && nacionalidades.map((e,i)=>{
                          return (
                             <option value={e.country} key={i}>{e.country} </option>
                            )
                        })
                      }
                     </select>
                     <div className="valid-feedback">Campo OK</div>
                     <div className="invalid-feedback">Complete los datos</div>
                   </div>
                 </div>
                 <br></br>

                 <h5 className="datosformulario"><span>DATOS</span> DE RESIDENCIA</h5>

                 <div className="row">
                   <div className="col-sm-12 col-md-6 col-lg-6 mt-3">
                      <label id="renglonresidencia" htmlFor="localidad">Localidad:</label>
                     <select className= "inputselect5 form-select" name="localidad" id="localidad" value={localidad} onChange={handleInputChange} required>    
                       <option selected disabled value="">Seleccione la localidad</option>
                       <option value="Antonio Nari??o">Antonio Nari??o</option>
                       <option value="Barrios Unidos">Barrios Unidos</option>
                       <option value="Bosa">Bosa</option>
                       <option value="Chapinero">Chapinero</option>
                       <option value="Ciudad Bolivar">Ciudad Bolivar</option>
                       <option value="Engativ??">Engativ??</option>
                       <option value="Fontib??n">Fontib??n</option>
                       <option value="Kennedy">Kennedy</option>
                       <option value="Candelaria">Candelaria</option>
                       <option value="M??rtires">M??rtires</option>
                       <option value="Puente Aranda">Puente Aranda</option>
                       <option value="Rafael Uribe Uribe">Rafael Uribe Uribe</option>
                       <option value="San Crist??bal">San Crist??bal</option>
                       <option value="Santa Fe">Santa Fe</option>
                       <option value="Suba">Suba</option>
                       <option value="Sumapaz">Sumapaz</option>
                       <option value="Teusaquillo">Teusaquillo</option>
                       <option value="Tunjuelito">Tunjuelito</option>
                       <option value="Usaqu??n">Usaqu??n</option>
                       <option value="Usme">Usme</option>
                     </select>
                     <div className="valid-feedback">Campo OK</div>
                     <div className="invalid-feedback">Complete el campo</div>
                   </div>
                
                   <div className="col-sm-12 col-md-6 col-lg-6 mt-3">  
                      <label id="renglon" htmlFor="barrio">Barrio:</label>
                      <input className="inputbarrio" type="text" id="barrio" name="barrio" size="20" maxLength="20" value={barrio} onChange={handleInputChange} pattern="[A-z??????????????????????????????????\s]{3,35}" required/>
                      <div className="valid-feedback">Campo OK</div>
                      <div className="invalid-feedback">Debe tener entre 3 y 35 letras</div> 
                  </div>
                 </div>

                 <div className="row">
                   <div className="col-sm-12 col-md-6 col-lg-6 mt-3">
                      <label id="renglonresidencia" htmlFor="direccion">Direcci??n casa:</label>
                      <input className= "inputselect4" type="text" id="direccion" name="direccion" size="80" maxLength="80" value={direccion} onChange={handleInputChange} pattern="[a-zA-Z0-9 ]{2,35}]" required/>
                      <div className="valid-feedback">Campo OK</div>
                      <div className="invalid-feedback">Puede contener caracteres y n??meros</div>
                   </div>
                   <div className="col-sm-12 col-md-6 col-lg-6 mt-3">  
                      <label id="renglon2" htmlFor="correo">Correo electr??nico:</label>
                      <input className="inputcorreo" type="text" id="correo" name="correo" value={correo} size="80" maxLength="80" placeholder="usuario@dominio.com" pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}" onChange={handleInputChange} required/>
                      <div className="valid-feedback">Campo OK</div>
                      <div className="invalid-feedback">Correo no v??lido </div>
                  </div>
                 </div>

                 <div className="row">
                   <div className="col-sm-12 col-md-6 col-lg-6 mt-3">
                      <label id="renglonresidencia" htmlFor="local">Tel??fono local:</label>
                      <input className="inputlocal" type="number" id="numlocal" name="numlocal" size="20" maxLength="20" value={numlocal} onChange={handleInputChange}/>
                   </div>
                   <div className="col-sm-12 col-md-6 col-lg-6 mt-3">  
                      <label id="renglonresidencia" htmlFor="movil">Tel??fono m??vil*:</label>
                      <input className= "inputmovil" type="number" id="nummovil" name="nummovil" size="20" maxLength="20" value={nummovil} onChange={handleInputChange} pattern="[0-9]{1,15}" required/>
                      <div className="valid-feedback">Campo OK</div>
                      <div className="invalid-feedback">El valor debe ser num??rico</div>
                  </div>
                 </div>

                 <br></br>

                 <h5 className="datosformulario"><span>ANTECEDENTES</span> CL??NICOS</h5>

                 <div className="col-sm-12 col-md-12 col-lg-12 mt-3">
                      <label id="renglonenfermedad2" htmlFor="enfermedad">Enfermedades preexitentes:</label>
                     <select className= "inputselect6 form-select form-selectenfer" name="enfermedad" id="enfermedad" value={enfermedad} onChange={handleInputChange} required>    
                       <option selected disabled value="">Seleccione</option>
                       <option value="Asma">Asma</option>
                       <option value="Cancer">Cancer</option>
                       <option value="Diabetes">Diabetes</option>
                       <option value="EPOC">EPOC (Enfermedad pulmonar obstructiva cr??nica)</option>
                       <option value="Hipertenciones arteriales">Hipertenciones arteriales</option>
                       <option value="Ninguna">Ninguna</option>
                       <option value="Obesidad">Obesidad</option>
                       <option value="Tuberculosis">Tuberculosis</option>
                       <option value="VIH">VIH</option>
                       <option value="otra">Otra</option>
                     </select>
                     <div className="valid-feedback">Campo OK</div>
                     <div className="invalid-feedback">Complete el campo</div>
                   </div>
                 <div className="col-sm-12 col-md-12 col-lg-12 mt-3">  
                      <label id="renglonenfermedad" htmlFor="enfermedad2">Otra enfermedad:</label>
                      <input className="inputselect7" type="text" id="otraenfermedad" name="otraenfermedad" value={otraenfermedad} size="80" maxLength="80" onChange={handleInputChange} />
                  </div>

                 <div className="row">
                    <div className="col-sm-12 col-md-5 col-lg-4 mt-3">
                        <label id="renglonaque" htmlFor="alergias">Alergias:</label>
                          <div className=" form-check-inline form-checkpaci">
                            <input className="form-check-input punto" type="radio" name="alergias" id="alergias" value="SI"  required="required" onChange={handleInputChange}/> 
                            <label className="form-check-label" htmlFor="inlineCheckbox1">SI</label>
                          </div>
                          <div className=" form-check-inline form-checkpaci">
                            <input className="form-check-input punto" type="radio" name="alergias" id="alergias" value="NO"  required="required" onChange={handleInputChange}/> 
                            <label className="form-check-label" htmlFor="inlineCheckbox2">NO</label>
                          </div>
                    </div>
                    <div className="col-sm-12 col-md-7 col-lg-8 mt-3">  
                             <label id="renglonaque" htmlFor="aque">??A qu???:</label>
                             <input className="inputaque" type="text" id="aque" name="aque" value={aque} size="80" maxLength="80" onChange={handleInputChange} />
                    </div> 
                 </div>
                  <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-9 mt-3" >
                      <Link to={`/paciente`}><button  className="botoncerrar">CERRAR</button></Link>

                    </div>
                     <div className="col-sm-12 col-md-6 col-lg-3 mt-3">
                       <button type="submit"  className="botonregistrar" >GUARDAR</button>
                    </div>
                  </div>
                   
                
               </form>
           </div>    
       </div>  
      </div>
    </div>

       

    );
}

export default Registropaciente;

