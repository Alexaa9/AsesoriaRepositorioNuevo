<template>
    <div class="menu-container">
      <!-- Header -->
      <header class="header">
        <img ref="menuIcon" src="@/assets/menu.png" alt="Menú" class="menu-icon" @click="toggleMenu" />
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
      </header>
  
      <!-- Menú desplegable -->
      <div v-show="menuOpen" class="dropdown-menu">
        <button class="dropdown-button" @click="goToBajaAlumno">Dar de baja Alumno</button>
        <button class="dropdown-button" @click="goToBajaAsesor">Dar Baja Asesor</button>
        <button class="dropdown-button" @click="goToEncuestasAdmin">Encuestas</button>
        <button class="dropdown-button" @click="goToSalir">Salir</button>
      </div>
  
      <!-- Contenido principal -->
      <div class="content-container">
        <div class="horizontal-section">
          <div class="profile-container">
            <!-- Botón de perfil con imagen -->
            <button class="profile-button" @click="goToPerfil">
              <img src="@/assets/asesorado.png" alt="Perfil" class="profile-icon" />
            </button>
            <p class="profile-name">Nombre completo</p>
          </div>
        </div>
  
        <!-- Título "Notificaciones" -->
        <div class="notifications-container">
          <p class="bold-text">Notificaciones</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "MenuAdminView",
    data() {
      return {
        menuOpen: false,
      };
    },
    methods: {
      toggleMenu() {
        this.menuOpen = !this.menuOpen;
      },
      goToBajaAlumno() {
        this.$router.push({ name: "BajaAlumno" });
      },
      goToBajaAsesor() {
        this.$router.push({ name: "BajaAsesor" });
      },
      goToEncuestasAdmin() {
        this.$router.push({ name: "EncuestasAdmin" });
      },
      goToSalir() {
        this.$router.push({ name: "Inicio" });
      },
      goToPerfil() {
        this.$router.push({ name: "PerfilAdmin" });
      }
    },
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
    display: block;
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
  
  /* Contenido principal */
  .content-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 140px;
  }
  
  /* Sección de perfil */
  .profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  /* Botón de perfil */
  .profile-button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    width: 55px;
  }
  
  .profile-button:hover {
    opacity: 0.8;
  }
  
  /* Ícono de perfil */
  .profile-icon {
    width: 40px;
    height: auto;
  }
  
  /* Texto debajo del botón de perfil */
  .profile-name {
    font-size: 1rem;
    color: #333;
    text-align: center;
    margin-top: 5px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  /* Título "Notificaciones" */
  .notifications-container {
    margin-top: -30px; /* Mueve el texto hacia arriba */
    text-align: center;
  }
  
  .bold-text {
    font-weight: bold;
    font-size: 1.5rem;
    color: #0a0a0a;
    text-align: center;
  }
  </style>
  