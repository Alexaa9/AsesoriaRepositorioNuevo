<template>
  <div class="menu-container">
    <!-- Encabezado -->
    <header class="header">
      <img ref="menuIcon" src="@/assets/menu.png" alt="Menú" class="menu-icon" @click="toggleMenu" />
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </header>

    <!-- Menú desplegable -->
    <div v-show="menuOpen" class="dropdown-menu">
      <button class="dropdown-button" @click="goToPerfil">Perfil</button>
      <button class="dropdown-button" @click="goToSoliTema">Solicitud de tema</button>
      <button class="dropdown-button" @click="goToMenu">Búsqueda de Asesorías</button>
      <button class="dropdown-button" @click="goToNoti">Notificaciones</button>
      <button class="dropdown-button" @click="goToSalir">Salir</button>
    </div>

    <!-- Contenido principal -->
    <div class="content-container">
      <div class="text-section">
        <p class="bold-text">Evaluación Asesoría y Observaciones </p>
      </div>

      <div class="additional-section">
        <p class="paragraph">Para evaluar a este asesor accede al formulario</p>
       
      </div>
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSd0FXU2k631H077s7iyJvdi4nuegWdPVIBesgQsa2yRv3lWsA/viewform?embedded=true" width="640" height="3589" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>

      <!-- Tabla de Observaciones -->
      <div class="observaciones-container" v-if="observaciones.length">
        <h3>Observaciones</h3>
        <table class="observaciones-table">
          <thead>
            <tr>
              <th>Modalidad</th>
              <th>Asesor</th>
              <th>Título</th>
              <th>Fecha Asesoría</th>
              <th>Mensaje</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="obs in observaciones" :key="obs.id">
              <td>{{ obs.modalidad }}</td>
              <td>{{ obs.asesor }}</td>
              <td>{{ obs.titulo }}</td>
              <td>{{ obs.fechaAsesoria }}</td>
              <td>{{ obs.mensaje }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getFirestore,
  collection,
  getDocs
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "EvaluacionView",
  data() {
    return {
      menuOpen: false,
      observaciones: []
    };
  },

  async mounted() {
    await this.cargarObservaciones();
  },

  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    goToPerfil() {
      this.$router.push({ name: "PerfilAsesorado" });
    },
    goToNoti() {
      this.$router.push({ name: "NotiAsesorado" });
    },
    goToSoliTema() {
      this.$router.push({ name: "SolicitudTema" });
    },
    goToMenu() {
      this.$router.push({ name: "MenuAsesorado" });
    },
    goToEvaluacion() {
      this.$router.push({ name: "Evaluacion" });
    },
    goToSalir() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$router.push({ name: "Inicio" });
        })
        .catch((error) => {
          console.error("Error al cerrar sesión:", error);
        });
    },

    async cargarObservaciones() {
      const db = getFirestore();
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const obsRef = collection(db, "Asesorado", user.email, "observaciones");
      const snapshot = await getDocs(obsRef);

      this.observaciones = snapshot.docs.map(doc => ({
        id: doc.id,
        modalidad: doc.data().modalidad,
        asesor: doc.data().asesor,
        titulo: doc.data().titulo,
        fechaAsesoria: doc.data().fechaAsesoria,
        mensaje: doc.data().mensaje
      }));

      console.log("Observaciones cargadas:", this.observaciones);
    },
  }
};
</script>

<style scoped>
.observaciones-container {
  margin-top: 20px;
  text-align: center;
}

.observaciones-table {
  width: 100%;
  border-collapse: collapse;
}

.observaciones-table th,
.observaciones-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.observaciones-table th {
  background-color: #2e2a67;
  color: white;
}

.observaciones-table tr:nth-child(even) {
  background-color: #f8f9fa;
}
</style>
