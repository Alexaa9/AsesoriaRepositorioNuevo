<template>
  <div class="menu-container">
    <!-- Header -->
    <header class="header">
      <img
        ref="menuIcon"
        src="@/assets/menu.png"
        alt="Menú"
        class="menu-icon"
        @click="toggleMenu"
      />
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </header>

    <!-- Menú desplegable -->
    <div v-show="menuOpen" class="dropdown-menu">
      <button class="dropdown-button" @click="goToPerfil">Perfil asesor</button>
      <button class="dropdown-button" @click="goToMenu">Mis asesorías</button>
      <button class="dropdown-button" @click="goToAsistencias">Asistencias</button>
      <button class="dropdown-button" @click="goToComentarios">Comentarios</button>
      <button class="dropdown-button">Salir</button>
    </div>

    <!-- Contenido principal -->
    <div class="content-container">
      <div class="text-section">
        <p class="bold-text">Notificaciones Asesor</p>
      </div>

      <!-- Lista de Solicitudes -->
      <div class="solicitudes-container">
        <h3>Solicitudes Pendientes</h3>
        <ul v-if="solicitudes.length">
          <li v-for="(solicitud, index) in solicitudes" :key="solicitud.id">
            <p><strong>Materia:</strong> {{ solicitud.materia }}</p>
            <p><strong>Tema:</strong> {{ solicitud.tema }}</p>
            <p><strong>Urgencia:</strong> {{ solicitud.urgencia }}</p>
            <p><strong>Hora:</strong> {{ solicitud.hora }}</p>
            <button @click="confirmarSolicitud(solicitud, index)" class="confirm-button">Confirmar</button>
            <button @click="rechazarSolicitud(solicitud, index)" class="reject-button">Rechazar</button>
          </li>
        </ul>
        <p v-else>No hay solicitudes pendientes.</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
  arrayUnion
} from "firebase/firestore";

export default {
  name: "NotiAsesorView",
  data() {
    return {
      menuOpen: false,
      solicitudes: []
    };
  },
  async mounted() {
    await this.obtenerSolicitudes();
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    goToPerfil() {
      this.$router.push({ name: "PerfilAsesor" });
    },
    goToAsistencias() {
      this.$router.push({ name: "AsistenciaAsesor" });
    },
    goToComentarios() {
      this.$router.push({ name: "ComentariosAsesor" });
    },
    goToMenu() {
      this.$router.push({ name: "MenuAsesor" });
    },

    async obtenerSolicitudes() {
      try {
        const db = getFirestore();
        const subcolSolicitudesRef = collection(db, "Asesorias", "Solicitudes", "solicitudes");
        const solicitudesSnap = await getDocs(subcolSolicitudesRef);

        const solicitudesTotales = solicitudesSnap.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data()
        }));

        this.solicitudes = solicitudesTotales;
        console.log("Solicitudes obtenidas:", this.solicitudes); // 🔍 Verifica en la consola
      } catch (error) {
        console.error("Error al obtener solicitudes:", error);
      }
    },

    async confirmarSolicitud(solicitud, index) {
      try {
        const db = getFirestore();

        // Eliminar de la subcolección original
        const solicitudRef = doc(db, "Asesorias", "Solicitudes", "solicitudes", solicitud.id);
        await deleteDoc(solicitudRef);

        // Guardar en nueva colección Confirmadas
        const confirmadasRef = doc(db, "Asesorias", "Confirmadas");
        await setDoc(confirmadasRef, {}, { merge: true });
        await updateDoc(confirmadasRef, {
          asesoriasConfirmadas: arrayUnion(solicitud)
        });

        this.solicitudes.splice(index, 1);
        alert("Solicitud confirmada correctamente.");
      } catch (error) {
        console.error("Error al confirmar la solicitud:", error);
      }
    },

    async rechazarSolicitud(solicitud, index) {
      try {
        const db = getFirestore();
        const solicitudRef = doc(db, "Asesorias", "Solicitudes", "solicitudes", solicitud.id);
        await deleteDoc(solicitudRef);

        this.solicitudes.splice(index, 1);
        alert("Solicitud rechazada correctamente.");
      } catch (error) {
        console.error("Error al rechazar la solicitud:", error);
      }
    }
  }
};
</script>

<style>
.menu-container {
  position: relative;
}
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
.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 140px;
}
.solicitudes-container {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
}
.confirm-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
}
.confirm-button:hover {
  background-color: #45a049;
}
.reject-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}
.reject-button:hover {
  background-color: #d32f2f;
}
</style>
