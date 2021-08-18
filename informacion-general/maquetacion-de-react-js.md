---
description: En ésta página hay información general acerca de la Maquetación en React Js
---

# Maquetación de React JS

  
**Maquetación de React**

React es una biblioteca Javascript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página. Es mantenido por Facebook y la comunidad de software libre. En el proyecto hay más de mil desarrolladores libres. Para el desarrollo del aplicativo web se organizaron de la siguiente manera los componentes y páginas: 

**Componentes:** Login, Header, Nav, Footer, Tabla Dashboard, Tabla Paciente, Tabla Vacunación, Registro Paciente \(formulario\), Registro Vacuna \(formulario\), Card View Dashboard, Card View Paciente, Card View Vacunación. 

**Páginas:** Login, Dashboard, Paciente, Vacunación, Registro Paciente, Registro Vacuna, Card Dashboard, Card Paciente, Card Vacuna, Error404.

Lo primero que se realizó fueron las descargas de React Router, de Bootstrap, Firebase, Axios, Lodash, sweetalert2 y GH-pages. A continuación, se desarrollaron uno por uno de los componentes con su respectiva hoja de estilos; el enrutado se realizó en App, se realizó las modificaciones generales en el archivo Index y en su hoja de estilos y se crearon las páginas correspondientes de cada uno de los componentes para llamarlas luego en el enrutado. Para el Login se llamó solo el componente y para el resto de las interfaces, dentro de la página se llamaron el Header, el componente y finalmente el Footer. La maquetación se realizó en su gran mayoría con la librería de Bootstrap y todas las páginas cuentan con responsive para pantallas de 1400px, 1024px, 768px, 425px, 375px y 320px. Se agregó la librería Axios para importar una Api de nacionalidades dentro del formulario de registro paciente, los formularios cuentan con sus respectivas validaciones, la Crud esta enlazada a Firebase con Realtime Database y los alert están construidos por medio de la librería Sweetalert2.

![](../.gitbook/assets/image%20%282%29.png)



