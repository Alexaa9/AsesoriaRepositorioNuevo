<template>
  <div class="profile-container">
    <!-- Header -->
    <header class="header">
      <img src="@/assets/logo.png" alt="Tecnológico Nacional de México" class="logo" />
    </header>

    <header class="header">
      <img ref="menuIcon" src="@/assets/menu.png" alt="Menú" class="menu-icon" @click="toggleMenu" />
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </header>

    <!-- Menú desplegable -->
    <div v-show="menuOpen" class="dropdown-menu">
      <button class="dropdown-button" @click="goToPerfil">Perfil</button>
      <button class="dropdown-button" @click="goToAsistencias">Asistencias</button>
      <button class="dropdown-button" @click="goToNoti">Notificaciones</button>
      <button class="dropdown-button" @click="goToComentarios">Comentarios</button>
      <button class="dropdown-button" @click="goToSalir">Salir</button>
    </div>

    <!-- Sección para crear Google Meet -->
    <section class="meet-section">
      <h2>Generar reunión en Google Meet</h2>
      <button class="meet-button" @click="crearMeet">Crear Meet</button>
      <input v-model="meetLink" type="text" placeholder="Enlace de Meet" class="meet-input" readonly />
      <button v-if="meetLink" class="meet-access-button" @click="abrirMeet">Abrir Meet</button>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AsistenciaAsesor",
  data() {
    return {
      menuOpen: false,
      meetLink: "" // Para almacenar el enlace de Meet
    };
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

    async crearMeet() {
      try {
        const response = await axios.post(
          "https://www.googleapis.com/calendar/v3/calendars/primary/events",
          {
            summary: "Reunión en Google Meet",
            start: { dateTime: new Date().toISOString(), timeZone: "America/Mexico_City" },
            end: { dateTime: new Date(Date.now() + 3600000).toISOString(), timeZone: "America/Mexico_City" },
            conferenceData: { createRequest: { requestId: "meeting" } }
          },
          {
            headers: {
              Authorization: `Bearer TU_TOKEN_DE_ACCESO`
            }
          }
        );

        this.meetLink = response.data.hangoutLink;
      } catch (error) {
        console.error("Error al crear la reunión:", error);
        alert("No se pudo generar la reunión.");
      }
    },

    abrirMeet() {
      window.open(this.meetLink, "_blank");
    }
  }
};
</script>

<style>
.profile-container {
  padding: 20px;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2e2a67;
  color: white;
  padding: 20px;
}

.logo {
  width: 200px;
}

/* Sección de Meet */
.meet-section {
  text-align: center;
  margin-top: 40px;
}

.meet-button {
  background-color: #2e2a67;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}

.meet-input {
  padding: 10px;
  width: 300px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}

.meet-access-button {
  background-color: green;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}
</style>
