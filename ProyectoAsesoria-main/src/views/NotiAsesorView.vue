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
      <button class="dropdown-button" @click="goToComentarios">Comentarios</button>
      <button class="dropdown-button" @click="goToSalir">Salir</button>
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

      <!-- Sección de mensajería -->
      <div class="mensajeria-container">
        <h3>Chat de Asesoría</h3>
        <div class="messages">
          <p v-for="mensaje in mensajes" :key="mensaje.timestamp">
            <strong>{{ mensaje.remitente }}:</strong> {{ mensaje.mensaje }}
          </p>
        </div>
        <input v-model="nuevoMensaje" placeholder="Escribe un mensaje..." />
        <button @click="enviarMensaje">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs, doc, deleteDoc, setDoc, updateDoc, arrayUnion, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "NotiAsesorView",
  data() {
    return {
      menuOpen: false,
      solicitudes: [],
      mensajes: [],
      nuevoMensaje: ""
    };
  },
  async mounted() {
    await this.obtenerSolicitudes();
    this.cargarMensajes();
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    goToPerfil() {
      this.$router.push({ name: "PerfilAsesor" });
    },
    goToComentarios() {
      this.$router.push({ name: "ComentariosAsesor" });
    },
    goToMenu() {
      this.$router.push({ name: "MenuAsesor" });
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
    async obtenerSolicitudes() {
      try {
        const db = getFirestore();
        const subcolSolicitudesRef = collection(db, "Asesorias", "Solicitudes", "solicitudes");
        const solicitudesSnap = await getDocs(subcolSolicitudesRef);
        this.solicitudes = solicitudesSnap.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
      } catch (error) {
        console.error("Error al obtener solicitudes:", error);
      }
    },
    async confirmarSolicitud(solicitud, index) {
      try {
        const db = getFirestore();
        const solicitudRef = doc(db, "Asesorias", "Solicitudes", "solicitudes", solicitud.id);
        await deleteDoc(solicitudRef);
        const confirmadasRef = doc(db, "Asesorias", "Confirmadas");
        await setDoc(confirmadasRef, {}, { merge: true });
        await updateDoc(confirmadasRef, { asesoriasConfirmadas: arrayUnion(solicitud) });
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
    },
    async enviarMensaje() {
      if (!this.nuevoMensaje.trim()) return;
      const db = getFirestore();
      await addDoc(collection(db, "Mensajes"), {
        remitente: "asesorId",
        destinatario: "asesoradoId",
        mensaje: this.nuevoMensaje,
        timestamp: serverTimestamp(),
      });
      this.nuevoMensaje = "";
    },
    cargarMensajes() {
      const db = getFirestore();
      onSnapshot(collection(db, "Mensajes"), snapshot => {
        this.mensajes = snapshot.docs.map(doc => doc.data());
      });
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

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 140px;
}

.mensajeria-container {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
}

.messages p {
  padding: 5px;
  border-bottom: 1px solid #ddd;
}

input {
  width: 100%;
  padding: 10px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
}
</style>