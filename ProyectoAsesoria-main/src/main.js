import { createApp } from 'vue'
import App from './App.vue'
import 'bulma/css/bulma.css';
import { createRouter, createWebHistory } from 'vue-router';
import InicioView from './views/InicioView.vue';
import LoginAsesoradoView from './views/LoginAsesoradoView.vue';
import CrearAsesoradoView from './views/CrearAsesoradoView.vue';
import RecuperarAsesoradoView from './views/RecuperarAsesoradoView.vue';
import MenuAsesoradoView from './views/MenuAsesoradoView.vue';
import PerfilAsesoradoView from './views/PerfilAsesoradoView.vue';
import NotiAsesoradoView from './views/NotiAsesoradoView.vue';
import SolicitudTemaView from './views/SolicitudTemaView.vue';
import EvaluacionView from './views/EvaluacionView.vue';
import LoginAsesorView from './views/LoginAsesorView.vue';
import CrearAsesorView from './views/CrearAsesorView.vue';
import RecuperarAsesorView from './views/RecuperarAsesorView.vue';
import MenuAsesorView from './views/MenuAsesorView.vue';
import PerfilAsesorView from './views/PerfilAsesorView.vue';
import SolicitudTemaAsesorView from './views/SolicitudTemaAsesorView.vue';
import NotiAsesorView from './views/NotiAsesorView.vue';
import AsistenciaAsesorView from './views/AsistenciaAsesorView.vue';
import ComentariosAsesorView from './views/ComentariosAsesorView.vue';
import MenuAdminView from './views/MenuAdminView.vue';
import LoginAdminView from './views/LoginAdminView.vue';
import BajaAlumnoView from './views/BajaAlumnoView.vue';
import BajaAsesorView from './views/BajaAsesorView.vue';
import EncuestasAdminView from './views/EncuestasAdminView.vue';
import PerfilAdminView from './views/PerfilAdminView.vue';

// Define las rutas
const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: InicioView,
  },
  {
    path: '/login-alumno',
    name: 'LoginAsesorado',
    component: LoginAsesoradoView,
  },
  {
    path: '/crear-Asesorado',
    name: 'CrearAsesorado',
    component: CrearAsesoradoView,
  },
  {
    path: '/recuperar-Asesorado',
    name: 'RecuperarAsesorado',
    component: RecuperarAsesoradoView,
  },
  {
    path: '/menu-Asesorado',
    name: 'MenuAsesorado',
    component: MenuAsesoradoView,
  },
  {
    path: '/perfil-Asesorado',
    name: 'PerfilAsesorado',
    component: PerfilAsesoradoView,
  },
  {
    path: '/noti-Asesorado',
    name: 'NotiAsesorado',
    component: NotiAsesoradoView,
  },
  {
    path: '/solicitud-tema',
    name: 'SolicitudTema',
    component: SolicitudTemaView,
  },
  {
    path: '/evaluacion',
    name: 'Evaluacion',
    component: EvaluacionView,
  },
  {
    path: '/login-asesor',
    name: 'LoginAsesor',
    component: LoginAsesorView,
  },
  {
    path: '/crear-asesor',
    name: 'CrearAsesor',
    component: CrearAsesorView,
  },
  {
    path: '/recuperar-Asesor',
    name: 'RecuperarAsesor',
    component: RecuperarAsesorView,
  },
  {
    path: '/menu-Asesor',
    name: 'MenuAsesor',
    component: MenuAsesorView,
  },
  {
    path: '/perfil-Asesor',
    name: 'PerfilAsesor',
    component: PerfilAsesorView,
  },
  {
    path: '/solicitud-temaasesor',
    name: 'SolicitudTemaAsesor',
    component: SolicitudTemaAsesorView,
  },
  {
    path: '/noti-Asesor',
    name: 'NotiAsesor',
    component: NotiAsesorView,
  },
  {
    path: '/asistencia-Asesor',
    name: 'AsistenciaAsesor',
    component: AsistenciaAsesorView,
  },
  {
    path: '/comentarios-Asesor',
    name: 'ComentariosAsesor',
    component: ComentariosAsesorView,
  },
  {
    path: '/menu-Admin',
    name: 'MenuAdmin',
    component: MenuAdminView,
  },
  {
    path: '/login-Admin',
    name: 'LoginAdmin',
    component: LoginAdminView,
  },
  {
    path: '/baja-Alumno',
    name: 'BajaAlumno',
    component: BajaAlumnoView,
  },
  {
    path: '/baja-Asesor',
    name: 'BajaAsesor',
    component: BajaAsesorView,
  },

  {
    path: '/Encuestas-Admin',
    name: 'EncuestasAdmin',
    component: EncuestasAdminView,
  },
  {
    path: '/perfil-Admin',
    name: 'PerfilAdmin',
    component: PerfilAdminView,
  },

];

// Configura el router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Crea la aplicación Vue
const app = createApp(App);
app.use(router); // Usa Vue Router
app.mount('#app');

