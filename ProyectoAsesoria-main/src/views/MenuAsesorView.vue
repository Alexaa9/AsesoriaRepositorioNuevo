<template>
  <div class="menu-container">
    <!-- Encabezado -->
    <header class="header">
      <img ref="menuIcon" src="@/assets/menu.png" alt="Menú" class="menu-icon" @click="toggleMenu" />
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </header>

    <!-- Menú desplegable -->
    <div v-show="menuOpen" class="dropdown-menu">
      <button class="dropdown-button" @click="goToAsistencias">Asistencias</button>
      <button class="dropdown-button" @click="goToNoti">Notificaciones</button>
      <button class="dropdown-button" @click="goToComentarios">Comentarios</button>
      <button class="dropdown-button" @click="goToSalir">Salir</button>
    </div>

    <!-- Contenido principal -->
    <div class="content-container">
      <div class="horizontal-section">
        <div class="top-icons">
          <div class="profile-container">
            <button class="profile-button" @click="goToPerfil">
              <img src="@/assets/asesorado.png" alt="Perfil" class="profile-icon" />
            </button>
            <p class="profile-name">{{ nombreAsesor }}</p>
          </div>

          <div class="mis-asesorias-container">
            <p class="bold-text">Mis Asesorías</p>
          </div>

          <div class="notification-container">
            <button class="notification-button" @click="goToNoti">
              <img src="@/assets/notificacion.png" alt="Notificación" class="notification-icon" />
            </button>
            <p class="notification-text">Mis notificaciones</p>
          </div>
        </div>
      </div>

      <!-- Formulario de asesoría -->
      <div class="asesoria-container">
        <p class="bold-text">Crear Nueva Asesoría</p>

        <!-- Nombre del asesor (readonly) -->
        <input
          v-model="nombreAsesor"
          type="text"
          readonly
          placeholder="Nombre del Asesor"
          class="asesoria-input bg-gray-100"
        />

        <input v-model="nuevaAsesoria.titulo" type="text" placeholder="Título de la asesoría" class="asesoria-input" />
        <input v-model="nuevaAsesoria.descripcion" type="text" placeholder="Descripción" class="asesoria-input" />
        <input v-model="nuevaAsesoria.aula" type="text" placeholder="Aula" class="asesoria-input" />
        <input v-model="nuevaAsesoria.fecha" type="date" class="asesoria-input" />
        <input v-model="nuevaAsesoria.hora" type="time" class="asesoria-input" />

        <!-- Modalidad -->
        <div class="modalidad-container">
          <label for="modalidad" class="asesoria-label">Modalidad:</label>
          <select v-model="nuevaAsesoria.modalidad" id="modalidad" class="asesoria-input">
            <option value="virtual">Virtual</option>
            <option value="presencial">Presencial</option>
          </select>
        </div>

         <!-- Campo para link de Google Meet si modalidad es virtual -->
      <div v-if="nuevaAsesoria.modalidad === 'virtual'">
        <input
          v-model="nuevaAsesoria.meetLink"
          type="url"
          placeholder="Link de Google Meet"
          class="asesoria-input"
        />
      </div>

        <button @click="guardarAsesoria" class="asesoria-button">Guardar</button>
      </div>

      <!-- Lista de asesorías -->
      <div class="asesoria-list">
        <p class="bold-text">Mis Asesorías</p>
        <div class="asesoria-horizontal-list">
          <div class="asesoria-card" v-for="asesoria in asesorias" :key="asesoria.id">
            <strong>{{ asesoria.titulo }}</strong><br />
            {{ asesoria.descripcion }}<br />
            Aula: {{ asesoria.aula }}<br />
            Fecha: {{ asesoria.fecha }}<br />
            Hora: {{ asesoria.hora }}<br />
            Modalidad: {{ asesoria.modalidad }}<br />
              <span v-if="asesoria.modalidad === 'virtual'">Enlace Meet: <a :href="asesoria.meetLink" target="_blank">{{ asesoria.meetLink }}</a></span><br />
            Asesor: {{ asesoria.nombreAsesor }}
            <button @click="eliminarAsesoria(asesoria.id)" class="delete-button">Eliminar</button>
          </div>
        </div>
      </div>

      <!-- Google Calendar -->
      <div class="calendar-container">
        <iframe 
          :src="calendarUrl"
          style="border: 0"
          width="800"
          height="600"
          frameborder="0"
          scrolling="no">
        </iframe>
        <button @click="openGoogleCalendar" class="access-button">Abrir Google Calendar</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "MenuAsesorView",
  data() {
    return {
      menuOpen: false,
      nombreAsesor: "",
      calendarUrl: "",
      nuevaAsesoria: {
        titulo: "",
        descripcion: "",
        aula: "",
        fecha: "",
        hora: "",
        modalidad: "virtual", // Se añadió la coma faltante
        meetLink: "" // Campo opcional para la reunión de Google Meet
      },
      asesorias: []
    };
  },

  async mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await this.cargarDatosAsesor();
        await this.cargarAsesorias();
        this.calendarUrl = `https://calendar.google.com/calendar/embed?src=${user.email}&ctz=America/Mexico_City`;
      }
    });
  },

  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    goToPerfil() {
      this.$router.push({ name: "PerfilAsesor" });
    },
    goToNoti() {
      this.$router.push({ name: "NotiAsesor" });
    },
    goToAsistencias() {
      this.$router.push({ name: "AsistenciaAsesor" });
    },
    goToComentarios() {
      this.$router.push({ name: "ComentariosAsesor" });
    },
    goToSalir() {
      this.$router.push({ name: "Inicio" });
    },
    openGoogleCalendar() {
      window.open(this.calendarUrl, "_blank");
    },

    async guardarAsesoria() {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        alert("No estás autenticado.");
        return;
      }

      if (!this.nombreAsesor) {
        await this.cargarDatosAsesor();
      }

      const db = getFirestore();
      const asesoriaData = {
        titulo: this.nuevaAsesoria.titulo,
        descripcion: this.nuevaAsesoria.descripcion,
        fecha: this.nuevaAsesoria.fecha,
        hora: this.nuevaAsesoria.hora,
        aula: this.nuevaAsesoria.aula,
        modalidad: this.nuevaAsesoria.modalidad,
        meetLink: this.nuevaAsesoria.modalidad === "virtual" ? this.nuevaAsesoria.meetLink : "", 
        nombreAsesor: this.nombreAsesor
      };

      try {
        const asesoriasRef = collection(db, "Asesorias");
        const nuevaAsesoriaDoc = await addDoc(asesoriasRef, asesoriaData);
        const asesoriaId = nuevaAsesoriaDoc.id;

        const subcoleccionRef = doc(db, "AsesoriasPorAsesor", user.email, "asesorias", asesoriaId);
        await setDoc(subcoleccionRef, asesoriaData);

        alert("Asesoría guardada correctamente.");
        this.nuevaAsesoria = { titulo: "", descripcion: "", aula: "", fecha: "", hora: "", modalidad: "virtual", meetLink: "" };
        await this.cargarAsesorias();
      } catch (error) {
        console.error("Error al guardar la asesoría:", error);
        alert("Ocurrió un error al guardar la asesoría.");
      }
    },

    async cargarAsesorias() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const db = getFirestore();
      const asesoriasRef = collection(db, "AsesoriasPorAsesor", user.email, "asesorias");
      const querySnapshot = await getDocs(asesoriasRef);

      this.asesorias = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    },

    async eliminarAsesoria(asesoriaId) {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const db = getFirestore();
      const docPrincipal = doc(db, "Asesorias", asesoriaId);
      const docSubcoleccion = doc(db, "AsesoriasPorAsesor", user.email, "asesorias", asesoriaId);

      await deleteDoc(docPrincipal);
      await deleteDoc(docSubcoleccion);

      this.asesorias = this.asesorias.filter(a => a.id !== asesoriaId);
    },

    async cargarDatosAsesor() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const db = getFirestore();
      const asesorRef = doc(db, "Asesores", user.email);
      const asesorSnap = await getDoc(asesorRef);

      if (asesorSnap.exists()) {
        const data = asesorSnap.data();
        this.nombreAsesor = `${data.nombre} ${data.apellidos}`;
      } else {
        console.warn("No se encontró el documento del asesor.");
        this.nombreAsesor = "Asesor desconocido";
      }
    }
  }
};
</script>

<style>
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
  width: 30px;
  cursor: pointer;
}

.logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  max-height: 80px;
}

.dropdown-menu {
  position: fixed;
  top: 100px;
  left: 20px;
  background-color: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 140px;
}

.horizontal-section {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.top-icons {
  display: flex;
  align-items: center;
  gap: 40px;
}

.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-icon {
  width: 40px;
  height: 40px;
}

.profile-name {
  font-size: 14px;
  font-weight: bold;
  color: #2e2a67;
  text-align: center;
  margin-top: 5px;
}

.notification-icon {
  width: 20px;
  height: 20px;
}

.notification-button {
  background-color: white;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.asesoria-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 300px;
}

.asesoria-button {
  background-color: #2e2a67;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}

.bold-text {
  text-align: center;
  width: 100%;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
}

.asesoria-horizontal-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.asesoria-card {
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  width: 250px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
