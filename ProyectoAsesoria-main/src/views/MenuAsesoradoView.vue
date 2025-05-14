<template>
  <div class="menu-container">
    <!-- Encabezado -->
    <header class="header">
      <img ref="menuIcon" src="@/assets/menu.png" alt="Menú" class="menu-icon" @click="toggleMenu" />
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </header>

    <!-- Menú desplegable -->
    <div v-show="menuOpen" class="dropdown-menu">
      <button class="dropdown-button" @click="goToSoliTema">Solicitud de tema</button>
      <button class="dropdown-button" @click="goToMenu">Búsqueda de Asesorías</button>
      <button class="dropdown-button" @click="goToNoti">Notificaciones</button>
      <button class="dropdown-button" @click="goToEvaluacion">Evaluación</button>
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

        <p class="bold-text">Búsqueda de Asesoría</p>

        <div class="notification-container">
          <button class="notification-button" @click="goToNoti">
            <img src="@/assets/notificacion.png" alt="Notificación" class="notification-icon" />
          </button>
          <p class="notification-text">Mis notificaciones</p>
        </div>
      </div>

      <!-- Barra de búsqueda -->
      <div class="search-input-wrapper">
        <img src="@/assets/buscador.png" alt="Buscar" class="search-icon" />
        <input type="text" class="search-input" placeholder="Escribe aquí tu búsqueda..." />
      </div>

      <!-- Calendario de asesorías -->
      <FullCalendar :options="calendarOptions" class="calendar-container" />
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';

export default {
  name: "MenuAsesoradoView",
  components: {
    FullCalendar
  },
  data() {
    return {
      menuOpen: false,
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        events: [] // Se llenará en mounted()
      }
    };
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
    goToMenu() {
      this.$router.push({ name: "MenuAsesorado" });
    },
    goToEvaluacion() {
      this.$router.push({ name: "Evaluacion" });
    },
    goToSoliTema() {
      this.$router.push({ name: "SolicitudTema" });
    },
    goToSalir() {
      this.$router.push({ name: "Inicio" });
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:8080/events');
      this.calendarOptions.events = response.data.map(event => ({
        title: event.summary,
        date: event.start.dateTime || event.start.date
      }));
    } catch (error) {
      console.error("Error cargando eventos:", error);
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

/* Menú desplegable */
.dropdown-menu {
  position: fixed;
  top: 100px;
  left: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 200;
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
  text-align: left;
  cursor: pointer;
  border-radius: 5px;
}

.dropdown-button:hover {
  background-color: #1a1a5e;
}

/* Contenedor principal */
.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 140px;
}

/* Barra de búsqueda */
.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 50%;
  max-width: 500px;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 5px;
  background-color: white;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 8px 12px;
  padding-left: 35px;
  font-size: 1rem;
}

.search-icon {
  position: absolute;
  left: 10px;
  width: 20px;
  height: 20px;
}

.search-input::placeholder {
  color: #aaa;
  font-style: italic;
}

/* Calendario */
.fc {
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
}

.calendar-container {
  margin-top: 20px;
}
</style>
