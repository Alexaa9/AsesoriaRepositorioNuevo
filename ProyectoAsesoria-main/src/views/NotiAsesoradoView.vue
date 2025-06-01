<template>
  <div class="menu-container">
    <header class="header">
      <img ref="menuIcon" src="@/assets/menu.png" alt="Menú" class="menu-icon" @click="toggleMenu" />
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </header>

    <div v-show="menuOpen" class="dropdown-menu">
      <button class="dropdown-button" @click="goToPerfil">Perfil</button>
      <button class="dropdown-button" @click="goToSoliTema">Solicitud de tema</button>
      <button class="dropdown-button" @click="goToMenu">Búsqueda de Asesorías</button>
      <button class="dropdown-button" @click="goToEvaluacion">Evaluación</button>
      <button class="dropdown-button" @click="goToSalir">Salir</button>
    </div>

    <div class="content-container">
      <div class="text-section">
        <p class="bold-text">Notificaciones</p>
      </div>

      <div class="select-asesor-container">
        <h3>Selecciona un Asesor</h3>
        <select v-model="destinatarioCorreo" @change="() => { cargarMensajes(); cargarObservaciones(); }">
          <option disabled value="">-- Selecciona un asesor --</option>
          <option v-for="asesor in asesores" :key="asesor.correo" :value="asesor.correo">
            {{ asesor.nombre }} ({{ asesor.correo }})
          </option>
        </select>
      </div>

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

      <!-- Nueva sección para Observaciones debajo del chat -->
      <div class="observaciones-container" v-if="observaciones.length > 0">
        <h3>Observaciones del Asesor</h3>
        <ul>
          <li v-for="obs in observaciones" :key="obs.fecha">
            <strong>Modalidad:</strong> {{ obs.modalidad }} <br />
            <strong>Asesor:</strong> {{ obs.asesor }} <br />
            <strong>Título:</strong> {{ obs.titulo }} <br />
            <strong>Fecha:</strong> {{ new Date(obs.fecha.seconds * 1000).toLocaleDateString() }}
          </li>
        </ul>
      </div>

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
import { getAuth, signOut } from "firebase/auth";

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
      observaciones: [], // Para almacenar las observaciones
    };
  },

  async mounted() {
    await this.obtenerDatosAsesorado();
    await this.obtenerAsesores();
    await this.cargarNotificaciones();

    if (this.destinatarioCorreo) {
      await this.cargarObservaciones();
    }
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
    goToNoti() {
      this.$router.push({ name: "NotiAsesorado" });
    },
    goToMenu() {
      this.$router.push({ name: "MenuAsesorado" });
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

    async obtenerDatosAsesorado() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        this.usuarioCorreo = user.email;
        const db = getFirestore();
        const asesoradoRef = doc(db, "Asesorados", user.email);
        const snapshot = await getDoc(asesoradoRef);
        if (snapshot.exists()) {
          this.usuarioNombre = snapshot.data().nombre;
        }
      }
    },

    async obtenerAsesores() {
      const db = getFirestore();
      const asesoresRef = collection(db, "Asesores");
      const snapshot = await getDocs(asesoresRef);
      this.asesores = snapshot.docs.map(doc => ({
        correo: doc.id,
        nombre: doc.data().nombre
      }));

      if (this.asesores.length > 0) {
        this.destinatarioCorreo = this.asesores[0].correo;
        this.cargarMensajes();
        this.cargarObservaciones();
      }
    },

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

    async cargarNotificaciones() {
      const db = getFirestore();
      const notiRef = collection(db, "Asesorado", this.usuarioCorreo, "Notificaciones");

      onSnapshot(notiRef, (snapshot) => {
        this.notificaciones = snapshot.docs
          .map(doc => doc.data())
          .sort((a, b) => a.timestamp?.seconds - b.timestamp?.seconds);
      });
    },

    // Cargar las observaciones desde la subcolección 'Observaciones' del asesorado
    async cargarObservaciones() {
      if (!this.destinatarioCorreo || !this.usuarioCorreo) return;

      const db = getFirestore();
      const obsRef = collection(db, "Asesorado", this.usuarioCorreo, "Observaciones");

      try {
        const snapshot = await getDocs(obsRef);
        console.log("Observaciones obtenidas:", snapshot.docs.map(doc => doc.data())); // Agregamos un console.log
        this.observaciones = snapshot.docs
          .map(doc => doc.data())
          .filter(obs => obs.asesor === this.destinatarioCorreo)
          .sort((a, b) => a.fecha?.seconds - b.fecha?.seconds);

        if (this.observaciones.length === 0) {
          console.log("No hay observaciones para este asesorado.");
        }
      } catch (error) {
        console.error("Error al cargar las observaciones:", error);
      }
    },

    async enviarMensaje() {
      if (!this.nuevoMensaje.trim() || !this.destinatarioCorreo) return;

      const db = getFirestore();

      await addDoc(collection(db, "Mensajes"), {
        remitenteCorreo: this.usuarioCorreo,
        remitenteNombre: this.usuarioNombre,
        destinatarioCorreo: this.destinatarioCorreo,
        mensaje: this.nuevoMensaje,
        timestamp: serverTimestamp(),
      });

      await addDoc(collection(db, "Asesores", this.destinatarioCorreo, "Notificaciones"), {
        tipo: "Mensaje nuevo",
        contenido: this.nuevoMensaje,
        remitenteCorreo: this.usuarioCorreo,
        remitenteNombre: this.usuarioNombre,
        timestamp: serverTimestamp(),
      });

      this.nuevoMensaje = "";
    },
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
.observaciones-container {
  background-color: #fff4e6;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #f0c36d;
  margin-top: 20px;
  width: 80%;
}
.observaciones-container ul {
  list-style-type: disc;
  padding-left: 20px;
}
.observaciones-container li {
  margin-bottom: 5px;
}
</style>
