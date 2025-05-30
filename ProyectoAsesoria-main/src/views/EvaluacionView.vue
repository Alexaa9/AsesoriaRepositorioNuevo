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
      <button class="dropdown-button">Notificaciones</button>
      <button class="dropdown-button" @click="goToEvaluacion">Evaluación</button>
      <button class="dropdown-button">Salir</button>
    </div>

    <!-- Contenido principal -->
    <div class="content-container">
      <div class="text-section">
        <p class="bold-text">Evaluación Asesoría</p>
      </div>

      <div class="additional-section">
        <p class="paragraph">Para evaluar a este asesor accede al formulario</p>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSd0FXU2k631H077s7iyJvdi4nuegWdPVIBesgQsa2yRv3lWsA/viewform?usp=header" class="link" target="_blank">Acceder al formulario</a>
      </div>

      <!-- Tabla de Asesorías Virtuales -->
      <div class="asesorias-virtuales-container" v-if="asesoriasVirtuales.length">
        <h3>Asesorías Virtuales</h3>
        <table class="asesorias-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Asesor</th>
              <th>Enlace</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="asesoria in asesoriasVirtuales" :key="asesoria.id">
              <td>{{ asesoria.tema }}</td>
              <td>{{ asesoria.fechaAsesoria }}</td>
              <td>{{ asesoria.hora }}</td>
              <td>{{ asesoria.nombreAsesor }}</td>
              <td><a :href="asesoria.enlaceMeet" target="_blank">Abrir Meet</a></td>
              <td>
                <button @click="registrarAsistencia(asesoria.id)">Asistir</button>
              </td>
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
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  where
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default {
  name: "EvaluacionView",
  data() {
    return {
      menuOpen: false,
      asesoriasVirtuales: [],
    };
  },

  async mounted() {
    await this.cargarAsesoriasVirtuales();
  },

  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    goToPerfil() {
      this.$router.push({ name: "PerfilAsesorado" });
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

    async cargarAsesoriasVirtuales() {
      const db = getFirestore();
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const asesoriasRef = collection(db, "Asesorias");
      const q = query(asesoriasRef, where("modalidad", "==", "virtual"), where("correoAsesorado", "==", user.email));

      const snapshot = await getDocs(q);
      this.asesoriasVirtuales = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log("Asesorías virtuales cargadas:", this.asesoriasVirtuales); // Depuración
    },

    async registrarAsistencia(asesoriaId) {
      const db = getFirestore();
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      try {
        await addDoc(collection(db, "Asistencias"), {
          usuarioCorreo: user.email,
          asesoriaId: asesoriaId,
          timestamp: serverTimestamp()
        });
        alert("Asistencia registrada correctamente.");
      } catch (error) {
        console.error("Error registrando asistencia:", error);
      }
    }
  }
};
</script>

<style>
.menu-container {
  position: relative;
}

/* Header */
.header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #2e2a67;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  z-index: 100;
  padding: 0 20px;
}

.menu-icon {
  position: absolute;
  left: 20px;
  width: 40px;
  height: auto;
  cursor: pointer;
}

.logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  max-height: 80px;
  height: auto;
}

/* Contenido principal */
.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 140px;
}

.bold-text {
  font-weight: bold;
  font-size: 1.5rem;
  color: #0a0a0a;
  text-align: center;
}

/* Tabla de asesorías virtuales */
.asesorias-virtuales-container {
  margin-top: 20px;
  text-align: center;
}

.asesorias-table {
  width: 100%;
  border-collapse: collapse;
}

.asesorias-table th,
.asesorias-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.asesorias-table th {
  background-color: #2e2a67;
  color: white;
}

.asesorias-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.asesorias-table td {
  color: black;
}

button {
  background-color: #2e2a67;
  color: white;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}
</style>
