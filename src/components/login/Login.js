import './login.css';
import login from '../../assets/images/login_image.png';
import forja from '../../assets/images/logoforja.png';
import Swal from "sweetalert2";

function Loginc(){


let usuario1= "forja"
  let password1= "forja"


  const handleSubmit=(e)=>{

   // console.log(e.target.querySelector('#usuario').value)


    let usuario = e.target.querySelector('#usuario').value
    let contrasena = e.target.querySelector('#contrasena').value

    e.preventDefault()

    if (usuario===usuario1 && contrasena===password1){
    
    
     Swal.fire({

        html: '<b style="color:black; font-size: 2em">Bienvenido a Forja!</b></br> </b>Vámos a la página de Inicio</b>',
        imageUrl: 'https://forjaempresas.com/wp-content/uploads/2020/08/Logos-01-1.png',
        icon: 'success',
        background: 'rgba(237, 240, 250) ',
        okButtonColor: '#F2692F',
      
}).then((result) => {
  if (result.isConfirmed) {
    window.location.replace("/dashboard");
  }
 })

    }
    else if (usuario==0 ){
      Swal.fire({

        html: '<b style="color:black">Por favor confirme su usuario</b>',
        icon: 'warning',
        background: 'rgba(237, 240, 250) ',
      
})

     }
      else if ( contrasena==0){
      Swal.fire({

        html: '<b style="color:black">Por favor confirme su contraseña</b>',
        icon: 'warning',
        background: 'rgba(237, 240, 250) ',
      
})
     }
    else {
      Swal.fire({

        html: '<b style="color:black">Usuario ó contraseña invalidos</b>',
        icon: 'warning',
        background: 'rgba(237, 240, 250) ',
      
})
    }

  }


	return(
		<div className="contenedorlogin">
     <div className="card mb-3" className="max-width: 540px;">
	        <div className="row g-0">
	          <div className="col-md-6">
	              <img src={login} className="img-fluid rounded-start" alt="Login"/>
	          </div>
	            <div className="fondo-form col-md-6">
	              <div className="card-login">
	               <form  id="formlogin" name="formulario" novalidate onSubmit={handleSubmit}>
		    
		              <div class="input-group mb-3">
		                <input id="usuario" className="input-login " type="text" placeholder="Usuario" aria-describedby="basic-addon2"/>
		              </div>
                      <br></br>
		              <div className="input-group mb-3">
						 <input id="contrasena" type="password" className="input-login " placeholder="Contraseña" aria-label=".form-control-lg example" />
					  </div>
					  
					  <div id="feedbackpass">
                              <div className="py-3 checkbox-login">
                                  <input type="checkbox" onclick="myFunction()"/> Mostrar Contraseña
                              </div>
                      </div>
                      <div className="mb-3">
					         <a href={forja}>Olvidaste tu contraseña</a>
					  </div>
					  <br></br>
					  <div className="input-group mb-3">
					          <button type="submit" className=" boton-login" >LOGIN</button> 
					  </div>
					  <br></br>
					  <div className="mb-3">
					    <img className="logologin" src={forja} />
					  </div>
		           </form>
	              </div>
	            </div>
	       </div>
     </div>
   </div>
		);
}

export default Loginc ;