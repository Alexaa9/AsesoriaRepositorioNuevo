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
        <p class="bold-text">Notificaciones</p>
      </div>

      <!-- Selección de asesor -->
      <div class="select-asesor-container">
        <h3>Selecciona un Asesor</h3>
        <select v-model="destinatarioCorreo" @change="cargarMensajes">
          <option disabled value="">-- Selecciona un asesor --</option>
          <option v-for="asesor in asesores" :key="asesor.correo" :value="asesor.correo">
            {{ asesor.nombre }} ({{ asesor.correo }})
          </option>
        </select>
      </div>

      <!-- Sección de Mensajería -->
      <div class="mensajeria-container" v-if="destinatarioCorreo">
        <h3>Chat con Asesor</h3>
        <div class="messages">
          <p
            v-for="mensaje in mensajes"
            :key="mensaje.timestamp?.seconds"
            :class="['mensaje', mensaje.remitenteCorreo === usuarioCorreo ? 'enviado' : 'recibido']"
          >
            <strong>{{ mensaje.remitenteNombre }}</strong>: {{ mensaje.mensaje }}
          </p>
        </div>
        <input v-model="nuevoMensaje" placeholder="Escribe un mensaje..." />
        <button @click="enviarMensaje">Enviar</button>
      </div>

      <!-- Sección de Notificaciones del Chat -->
      <div class="notificaciones-container">
        <h3>Historial de Notificaciones</h3>
        <div v-if="notificaciones.length">
          <ul>
            <li v-for="notificacion in notificaciones" :key="notificacion.timestamp?.seconds">
              <strong>{{ notificacion.tipo }}</strong>: {{ notificacion.contenido }}
            </li>
          </ul>
        </div>
        <p v-else>No hay notificaciones aún.</p>
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
  onSnapshot,
  doc,
  getDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default {
  name: "NotiAsesoradoView",
  data() {
    return {
      menuOpen: false,
      mensajes: [],
      nuevoMensaje: "",
      usuarioCorreo: "",
      usuarioNombre: "",
      destinatarioCorreo: "",
      asesores: [],
      notificaciones: [],
    };
  },

  async mounted() {
    await this.obtenerDatosAsesorado();
    await this.obtenerAsesores();
    await this.cargarNotificaciones();
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
    goToEvaluacion() {
      this.$router.push({ name: "Evaluacion" });
    },
    goToMenu() {
      this.$router.push({ name: "MenuAsesorado" });
    },

    // Obtener los datos del asesorado
    async obtenerDatosAsesorado() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        this.usuarioCorreo = user.email;
        const db = getFirestore();
        const asesoradoRef = doc(db, "Asesorado", user.email);
        const snapshot = await getDoc(asesoradoRef);
        if (snapshot.exists()) {
          this.usuarioNombre = snapshot.data().nombre;
        }
      }
    },

    // Obtener los asesores disponibles
    async obtenerAsesores() {
      const db = getFirestore();
      const asesoresRef = collection(db, "Asesores");
      const snapshot = await getDocs(asesoresRef);
      this.asesores = snapshot.docs.map(doc => ({
        correo: doc.id,
        nombre: doc.data().nombre
      }));

      // Seleccionamos el primer asesor por defecto
      if (this.asesores.length > 0) {
        this.destinatarioCorreo = this.asesores[0].correo;
        this.cargarMensajes();
      }
    },

    // Enviar un mensaje
    async enviarMensaje() {
      if (!this.nuevoMensaje.trim() || !this.destinatarioCorreo) return;

      const db = getFirestore();

      // Asegurarnos de que el correo del asesorado está correctamente en el estado
      const remitenteCorreo = this.usuarioCorreo;
      const remitenteNombre = this.usuarioNombre;

      // Guardar el mensaje en la colección "Mensajes"
      await addDoc(collection(db, "Mensajes"), {
        remitenteCorreo: remitenteCorreo, // El correo del asesorado
        remitenteNombre: remitenteNombre,
        destinatarioCorreo: this.destinatarioCorreo,
        mensaje: this.nuevoMensaje,
        timestamp: serverTimestamp(),
      });

      // Guardar la notificación en la subcolección "Notificaciones" del asesor
      await addDoc(collection(db, "Asesores", this.destinatarioCorreo, "Notificaciones"), {
        tipo: "Mensaje nuevo",
        contenido: this.nuevoMensaje,
        remitenteCorreo: remitenteCorreo, // El correo del asesorado
        remitenteNombre: remitenteNombre,
        timestamp: serverTimestamp(),
      });

      // Limpiar el campo de mensaje después de enviarlo
      this.nuevoMensaje = "";
    },

    // Cargar los mensajes entre el asesorado y el asesor seleccionado
    async cargarMensajes() {
      if (!this.destinatarioCorreo) return;

      const db = getFirestore();
      const mensajesRef = collection(db, "Mensajes");

      const q = query(mensajesRef, orderBy("timestamp", "asc"));

      onSnapshot(q, (snapshot) => {
        this.mensajes = snapshot.docs
          .map(doc => doc.data())
          .filter(msg =>
            (msg.remitenteCorreo === this.usuarioCorreo && msg.destinatarioCorreo === this.destinatarioCorreo) ||
            (msg.remitenteCorreo === this.destinatarioCorreo && msg.destinatarioCorreo === this.usuarioCorreo)
          );
      });
    },

    // Cargar las notificaciones del asesorado
    async cargarNotificaciones() {
      const db = getFirestore();
      const notiRef = collection(db, "Asesores", this.usuarioCorreo, "Notificaciones");
      onSnapshot(notiRef, (snapshot) => {
        this.notificaciones = snapshot.docs
          .map(doc => doc.data())
          .sort((a, b) => a.timestamp?.seconds - b.timestamp?.seconds);
      });
    }
  }
};
</script>

<style scoped>
.mensajeria-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  margin-top: 20px;
  border: 1px solid #ccc;
}

.messages {
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  max-height: 300px;
  overflow-y: auto;
}

.messages p {
  padding: 8px;
  border-radius: 8px;
  max-width: 80%;
  margin-bottom: 5px;
}

.messages .enviado {
  background-color: #2e2a67;
  color: white;
  text-align: right;
  margin-left: auto;
}

.messages .recibido {
  background-color: #e9ecef;
  color: black;
  text-align: left;
  margin-right: auto;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  background-color: #2e2a67;
  color: white;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 5px;
}

button:hover {
  background-color: #0056b3;
}

.notificaciones-container {
  background-color: #ffffff;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #ddd;
  margin-top: 20px;
}

.select-asesor-container {
  margin-bottom: 20px;
}
</style>
