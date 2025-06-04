# 📚 Sistema de Asesorías Universitarias enfocadas al ITE  

## 📝 Descripción del Proyecto  
El sistema de asesorías académicas es una aplicación web desarrollada con Vue.js que permite gestionar, programar y llevar el control de asesorías entre estudiantes y asesores de manera eficiente. Contiene una arquitectura modular cliente-servidor compuesta por un frontend SPA en Vue.js, un backend en Node.js (o funciones serverless con Firebase), integración con servicios externos como Google Calendar y almacenamiento en Firebase, siguiendo un estilo orientado a eventos y microservicios ligeros. Esta solución está orientada a mejorar la organización académica, facilitando la programación de asesorías, el seguimiento de solicitudes y la comunicación directa entre los participantes. Se trata de una aplicación web ligera y funcional, diseñada con una estructura simple y pocas interfaces, pero altamente práctica para el usuario. A pesar de su diseño minimalista con colores enfocados en el Instituto Tecnologico de Ensenada ofrece una experiencia clara, directa y fácil de utilizar.

Cada sección está pensada para que el usuario interactúe de forma intuitiva con el sistema, sin necesidad de capacitación previa, lo que permite realizar acciones clave de manera rápida y eficiente. Esta simplicidad favorece la usabilidad, la velocidad de carga y el enfoque en las funciones esenciales del sistema.

---

# 🛠️Estructura del ProyectoAsesorias-main/<br>
│
├── 📁backend/                 # Lógica del servidor y autenticación  
│   ├── ⚙️.env                 # Variables de entorno  
│   ├── 📄credenciales.js      # Configuración de credenciales  
│
├── 📁public/                # Archivos estáticos públicos  
│
├── 📁src/                     # Código fuente del frontend  
│   ├── 📁api/                 # Módulos de interacción con APIs  
│   │   ├── 📄authorize.js     # Autenticación con Firebase y Google  
│   │   ├── 📄calendar.js      # Integración con Google Calendar  
│   │
│   ├── 📁assets/              # Recursos estáticos (imágenes, logos, etc.)  
│   │   ├── 🖼️asesorado.png    # Imagen de asesorado  
│   │   ├── 🖼️buscador.png     # Imagen del buscador  
│   │   ├── 🖼️enviar.png       # Icono de enviar  
│   │   ├── 🖼️logo.png         # Logo de la aplicación  
│   │   ├── 🖼️menu.png         # Imagen del menú  
│   │   ├── 🖼️notificacion.png # Imagen de notificación  
│   │
│   ├── 📁firebase/            # Integración con Firebase  
│   │   ├── 📄auth.js         # Autenticación de Firebase  
│   │   ├── 📄firebaseConfig.js # Configuración de Firebase  
│   │   ├── 📄firestore.js    # Interacción con Firestore  
│   │
│   ├── 📁views/               # Componentes de las vistas  
│   │   ├── 📄InicioView.vue   # Vista de inicio  
│   │   ├── 📄PerfilAsesorView.vue # Vista de perfil del asesor  
│   │   ├── 📄PerfilAsesoradoView.vue # Vista de perfil del asesorado  
│   │   ├── 📄ComentariosAsesorView.vue # Vista de comentarios del asesor  
│   │   ├── 📄AsistenciaAsesorView.vue # Vista de asistencia  
│   │   ├── 📄EvaluacionView.vue # Vista de evaluación  
│   │   ├── 📄MenuAdminView.vue # Vista del menú del administrador  
│   │   ├── 📄MenuAsesoradoView.vue # Vista del menú del asesorado  
│   │   ├── 📄MenuAsesorView.vue # Vista del menú del asesor  
│   │   ├── 📄SolicitudTemaView.vue # Vista de solicitudes de tema  
│   │   ├── 📄RecuperarAsesoradoView.vue # Vista para recuperar asesorado  
│   │   ├── 📄RecuperarAsesorView.vue # Vista para recuperar asesor  
│
├── 📄App.vue                  # Componente raíz de la aplicación  
├── 📄main.js                  # Entrada principal de la aplicación  
├── 📄.gitignore               # Archivos ignorados por git  
├── 📄package.json             # Dependencias y scripts  
├── 📄vue.config.js            # Configuración de Vue  
│
└── 📁node_modules/            # Dependencias del proyecto  


## ✅ Pre-requisitos de Instalación  

Antes de instalar el sistema, asegúrate de contar con lo siguiente:  

- [Node.js](https://nodejs.org/) con npm instalados.  
- [Firebase](https://console.firebase.google.com/project/asesorias-32539/firestore/databases/-default-/data/~2FAsesorado~2Falumna@ite.edu.mx~2Fobservaciones~2Fomxqh9Lh0PFNiJ0SqqNM) como gestor de base de datos en consola llamada asesorias.
- [Visual Studio Code](https://code.visualstudio.com/) como editor (opcional).
- [Vue.js](https://vuejs.org/guide/quick-start.html) como Framework.
- [Google Cloud](https://console.cloud.google.com/apis/library/browse?inv=1&invt=Abywwg&project=asesorias-459817) cuenta de Cloud con Credenciales y APIs habilitados. Deberas obtener IDs de clientes secretos con OAuth 2.0 y tener claves de API. Tambien deberas agregar permisos sensibles.
- Conexión a internet para uso de APIs de Google (Google Calendar).
- Conexión a internet para uso de Google Forms.
- Cuenta de Google para iniciar sesion.

---

### Procedimiento de instalacion 📋

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
cd ProyectoAsesoria-main
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

📄 **Documentación del Proyecto:** [Proyecto Asesorias.pdf](https://github.com/user-attachments/files/20560434/Proyecto.Asesorias.pdf)

📄 **Manual de Usuario:** [Manual de usuario.pdf](https://github.com/user-attachments/files/20560437/Manual.de.usuario.pdf)

📄 **Manual Tecnico:** [Manual Tecnico.pdf](https://github.com/user-attachments/files/20585217/Manual.Tecnico.pdf)




