---
description: >-
  A continuación se encuentra la información general de como se desarrolló la
  CRUD y el sistema que se usó para ponerla en marcha.
---

# Integración React JS con Firebase

  
**Firestore Realtime database:** Permite agregar, actualizar y eliminar datos en tiempo real.

**Snapshot:** contiene los datos de la ubicación específica en la base de datos en el momento en que ocurrió el evento.             

**React Hooks**\(useState, useEffect\).

  
Se creó una crud con la Rama \(Pacientes\), donde se guarda toda la información de cada paciente que se identificación un ID único, lo que permite actualizar los datos en tiempo real de cada paciente por separado sin que se afecten los datos de los otros pacientes.

Se organizó la base de datos por medio de tablas donde se trae información básica y a su vez se crearon Cards donde se puede divisar información detallada de cada paciente de manera más específica.

![](../.gitbook/assets/image%20%2823%29.png)

**Ejemplo:**

Tabla Dashboard contiene datos básicos, al abrir la Card muestra la información total del paciente tanto general como de su vacunación.

Tabla Paciente contiene datos básicos, al abrir la Card Paciente muestra información básica del paciente exceptuando datos de vacunación.

Tabla Vacunación contiene datos básicos, al abrir la Card Vacunación muestra la información del proceso de vacunación, exceptuando la información básica del paciente.

Todas las Card comparten: Nombre paciente, Id Paciente y edad. El resto de la información depende de la ubicación donde nos encontremos.

**Edición Datos:**

Adicionalmente tenemos los formularios para Registro de Nuevo Paciente y Nuevo Registro de Vacunación, dichos Formularios a su vez sirven para Editar la información del Paciente; una vez se requiere editar información están diseñados de tal manera que al darle clic al botón Editar nos trae el formulario con todos los datos \(Los cuales están conectados por medio del ID del paciente\), y solamente debemos llenar o modificar la información respectiva.

**Eliminación de Datos:**

Las Tablas Paciente y vacunación tienen la opción de eliminar paciente, así como también Ver Mas \(para ver las Card\), y Editar.

La Tabla Dashboard cumple con la función de dar un vistazo general de la información de cada paciente y tiene el link de Vacuna para ir al Formulario de Vacunación y hacer las modificaciones respectivas.

Las tres páginas principales están linkeadas entre sí para poder navegar con facilidad hacia las diferentes páginas y formularios, la Pagina Dashboard adicionalmente tiene el botón de Registro de Nuevo Paciente, el cual también se encuentra ubicado en la página Paciente; en la página Vacunación se encuentra el botón de Nuevo Registro de Vacunación para acceder al formulario respectivo.

También se crearon alertas para redirigir al usuario a las diferentes páginas según requiera.

