# 📚 Sistema de Asesorías Universitarias enfocadas al ITE  

## 📝 Descripción del Proyecto  
El sistema de asesorías académicas es una aplicación web desarrollada con Vue.js que permite gestionar, programar y llevar el control de asesorías entre estudiantes y asesores de manera eficiente. Contiene una arquitectura modular cliente-servidor compuesta por un frontend SPA en Vue.js, un backend en Node.js (o funciones serverless con Firebase), integración con servicios externos como Google Calendar y almacenamiento en Firebase, siguiendo un estilo orientado a eventos y microservicios ligeros. Esta solución está orientada a mejorar la organización académica, facilitando la programación de asesorías, el seguimiento de solicitudes y la comunicación directa entre los participantes. Se trata de una aplicación web ligera y funcional, diseñada con una estructura simple y pocas interfaces, pero altamente práctica para el usuario. A pesar de su diseño minimalista con colores enfocados en el Instituto Tecnologico de Ensenada ofrece una experiencia clara, directa y fácil de utilizar.

Cada sección está pensada para que el usuario interactúe de forma intuitiva con el sistema, sin necesidad de capacitación previa, lo que permite realizar acciones clave de manera rápida y eficiente. Esta simplicidad favorece la usabilidad, la velocidad de carga y el enfoque en las funciones esenciales del sistema.

---

## 📁 Estructura del Proyecto (ProyectoAsesorias-main)
📁 ProyectoAsesorias-main
│── 📁 backend
│   ├── ⚙️.env 
│   ├── 📄 credenciales.js
│── 📁 node_modules  
│── 📁 public  
│── 📁 src  
│   ├── 📁 api 
│   │   └── 📄 authorize.js
│   │   └── 📄 calendar.js
│   ├── 📁 assets
│   │   └── 🌅 asesorado.png
│   │   └── 🌅 buscador.png
│   │   └── 🌅 enviar.png
│   │   └── 🌅 logo.png
│   │   └── 🌅 menu.png
│   │   └── 🌅 notificacion.png
│   ├── 📁 firebase
│   │   └── 📄 auth.js  
│   │   └── 📄 firebaseConfig.js 
│   │   └── 📄 firestore.js 
│   ├── 📁 views  
│   │   └── 📄 BajaAlumnoView.vue
│   │   └── 📄 BajaAsesorView.vue
│   │   └── 📄 ComentariosAsesorView.vue
│   │   └── 📄 CrearAsesoradoView.vue
│   │   └── 📄 CrearAsesorView.vue
│   │   └── 📄 EvaluacionView.vue
│   │   └── 📄 InicioView.vue
│   │   └── 📄 LoginAdminView.vue
│   │   └── 📄 LoginAsesoradoView.vue
│   │   └── 📄 LoginAsesorView.vue
│   │   └── 📄 MenuAdminView.vue
│   │   └── 📄 MenuAsesoradoView.vue
│   │   └── 📄 MenuAsesorView.vue
│   │   └── 📄 NotiAsesoradoView.vue
│   │   └── 📄 NotiAsesorView.vue
│   │   └── 📄 PerfilAdminView.vue
│   │   └── 📄 PerfilAsesoradoView.vue
│   │   └── 📄 PerfilAsesorView.vue
│   │   └── 📄 RecuperarAsesoradoView.vue
│   │   └── 📄 RecuperarAsesorView.vue
│   │   └── 📄 SolicitudTemaAsesorView.vue
│   │   └── 📄 SolicitudTemaView.vue
│── 📄 App.vue  
│── 📄 main.js  
│── 📄 .gitignore  
│── 📄 babel.config.js  
│── 📄 jsconfig.json  
│── 📄 package-lock.json  
│── 📄 package.json  
│── 📄 README.md  
└── 📄 vue.config.js  


---

## ✅ Pre-requisitos de Instalación  

Antes de instalar el sistema, asegúrate de contar con lo siguiente:  

- [Node.js](https://nodejs.org/) con npm instalados  
- [Firebase](https://console.firebase.google.com/project/asesorias-32539/firestore/databases/-default-/data/~2FAsesorado~2Falumna@ite.edu.mx~2Fobservaciones~2Fomxqh9Lh0PFNiJ0SqqNM) como gestor de base de datos en consola llamada asesorias.
- [Visual Studio Code](https://code.visualstudio.com/) como editor (opcional)
- [Vue.js](https://vuejs.org/guide/quick-start.html) como Framework
- [Google Cloud](https://console.cloud.google.com/apis/library/browse?inv=1&invt=Abywwg&project=asesorias-459817) cuenta de Cloud con Credenciales y APIs habilitados.
- Conexión a internet para uso de APIs de Google (Google Calendar)
- Conexión a internet para uso de Google Forms.
- Cuenta de Google para iniciar sesion.

---

### Instalacion 📋

_Comando de Node.js que se usa para instalar paquetes o dependencias en un proyecto

```
npm run install
```
_Instala Vue CLI globalmente (solo una vez)

```
npm install -g @vue/cli
```
_Crea un nuevo proyecto 

```
vue create ProyectoAsesoria-main
```
_Entra a la carpeta 

```
cd mi-proyecto-vue
```
_Inicia el servidor 

```
npm run serve
```
_App running at:

```
http://localhost:8081/
```
_Verifica version de vue

```
vue --version
```
_Instala bulma para diseño

```
npm install bulma
```
_Instalacion de Firebase en proyecto vue

```
npm install firebase

```
_Instala la biblioteca de cliente de Google API

```
npm install gapi-script

```
_Instalar FullCalendar y gapi

```
npm install @fullcalendar/vue3 @fullcalendar/core @fullcalendar/daygrid gapi-script

```
_Repositorio de GitHub

```
https://github.com/Alexaa9/AsesoriaRepositorioNuevo.git

```


## 👥 Integrantes del Proyecto
👤 Alexa Espinoza Murillo <br>
👤 Carlos Daniel López Vega <br>

---

📄 **Documentación del Proyecto:** [Accede aquí](https://docs.google.com/document/d/1jm7XVzMNtXdvODL4rA-e8vWEbzKD7CJ24IId1VVeDOU/edit?usp=sharing)  


