<template>
  <div class="menu-container">
    <!-- Header -->
    <header class="header">
      <img ref="menuIcon" src="@/assets/menu.png" alt="Menú" class="menu-icon" @click="toggleMenu"/>
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
        <div class="profile-container">
          <button class="profile-button" @click="goToPerfil">
            <img src="@/assets/asesorado.png" alt="Perfil" class="profile-icon" />
          </button>
          <p class="profile-name">Nombre completo</p>
        </div>

        <div class="icons-container">
          <p class="bold-text" style="text-align: center;">Mis Asesorías</p>

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
        <input v-model="nuevaAsesoria.titulo" type="text" placeholder="Título de la asesoría" class="asesoria-input"/>
        <input v-model="nuevaAsesoria.fecha" type="date" class="asesoria-input"/>
        <button @click="guardarAsesoria" class="asesoria-button">Guardar</button>
      </div>

      <!-- Lista de asesorías -->
      <div class="asesoria-list">
        <p class="bold-text">Mis Asesorías</p>
        <ul>
          <li v-for="asesoria in asesorias" :key="asesoria.id">
            {{ asesoria.titulo }} - {{ asesoria.fecha }}
          </li>
        </ul>
      </div>

      <!-- Calendario de Google con botón para abrir -->
      <div class="calendar-container">
        <iframe 
          src="https://calendar.google.com/calendar/embed?src=al22760556@ite.edu.mx&ctz=America/Mexico_City"
          style="border: 0"
          width="800"
          height="600"
          frameborder="0"
          scrolling="no">
        </iframe>

        <button @click="openGoogleCalendar" class="access-button">
          Abrir Google Calendar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

export default {
  name: "MenuAsesorView",
  data() {
    return {
      menuOpen: false,
      nuevaAsesoria: {
        titulo: "",
        fecha: ""
      },
      asesorias: []
    };
  },
  mounted() {
    this.cargarAsesorias();
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
      window.open("https://calendar.google.com/calendar/u/0/r", "_blank");
    },

    async guardarAsesoria() {
      if (!this.nuevaAsesoria.titulo || !this.nuevaAsesoria.fecha) {
        alert("Por favor, llena todos los campos.");
        return;
      }

      try {
        const db = getFirestore();
        await addDoc(collection(db, "Asesorias"), {
          titulo: this.nuevaAsesoria.titulo,
          fecha: this.nuevaAsesoria.fecha
        });

        alert("Asesoría guardada correctamente en Firestore.");
        this.nuevaAsesoria.titulo = "";
        this.nuevaAsesoria.fecha = "";
        this.cargarAsesorias();
      } catch (error) {
        console.error("Error al guardar asesoría:", error);
      }
    },

    async cargarAsesorias() {
      try {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, "Asesorias"));

        this.asesorias = [];
        querySnapshot.forEach((doc) => {
          this.asesorias.push({ id: doc.id, ...doc.data() });
        });
      } catch (error) {
        console.error("Error al cargar asesorías:", error);
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
  height: auto;
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
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.dropdown-button {
  width: 150px;
  padding: 10px;
  background-color: #2e2a67;
  color: white;
  border: none;
  cursor: pointer;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 140px;
}

.asesoria-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.asesoria-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.asesoria-button {
  background-color: #2e2a67;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.asesoria-list {
  margin-top: 20px;
}
.notification-icon {
    width: 30px; /* Aumenta el tamaño */
    height: 30px;
     background: none;
}
.notification-button {
  background: none; /* Elimina cualquier color de fondo */
  border: none; /* Quita el borde */
  padding: 5px; /* Ajusta el espaciado */
}
.icons-container {
  display: flex;
  align-items: center; /* Alinea verticalmente los elementos */
  justify-content: center; /* Centra horizontalmente */
  gap: 20px; /* Espacio entre los iconos */
}

.notification-container {
  display: flex;
  flex-direction: column; /* Mantiene la estructura de notificaciones */
  align-items: center;
  justify-content: center;
}
.profile-container {
  display: flex;
  flex-direction: column; /* Mantiene la estructura del perfil */
  align-items: center;
}
.horizontal-section {
  display: flex;
  align-items: center; /* Asegura alineación vertical */
  justify-content: space-between; /* Distribuye los elementos horizontalmente */
  width: 100%;
  padding: 5px; /* Reduce el padding para acercarlo más */
  margin-top: -20px; /* Mueve los elementos hacia arriba */
}

.profile-container,
.icons-container {
  display: flex;
  align-items: center;
  gap: 10px; /* Reduce el espacio entre los elementos */
}

.bold-text {
    text-align: center; /* Asegura que el texto esté centrado */
    width: 100%; /* Ocupe todo el ancho disponible */
    display: block; /* Asegura que el contenedor maneje el centrado */
}



</style>
