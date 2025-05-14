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
      <div
        v-show="menuOpen"
        class="dropdown-menu"
      >
        <button class="dropdown-button" @click="goToPerfil">Perfil</button>
        <button class="dropdown-button" @click="goToSoliTema">Solicitud de tema</button>
        <button class="dropdown-button" @click="goToMenu">Busqueda de Asesorias</button>
        <button class="dropdown-button" @click="goToNoti">Notificaciones</button>
        <button class="dropdown-button">Evaluación</button>
        <button class="dropdown-button">Salir</button>
      </div>
  
      <!-- Contenido principal -->
      <div class="content-container">
        <div class="text-section">
          <p class="bold-text">Evaluacion Asesoria</p>
        </div>
  
        <!-- Nuevo párrafo y enlace -->
        <div class="additional-section">
          <p class="paragraph">Para evaluar a este asesor accede al formulario</p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSd0FXU2k631H077s7iyJvdi4nuegWdPVIBesgQsa2yRv3lWsA/viewform?usp=header" class="link" target="_blank">Acceder al formulario</a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "EvaluacionView",
    data() {
      return {
        menuOpen: false,
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
      goToSoliTema() {
        this.$router.push({ name: "SolicitudTema" });
      },
      goToMenu() {
        this.$router.push({ name: "MenuAsesorado" });
      },
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
  
  .bold-text {
    font-weight: bold;
    font-size: 1.5rem;
    color: #0a0a0a;
    text-align: center;
  }
  
  /* Nueva sección adicional */
  .additional-section {
    margin-top: 20px;
    text-align: center;
  }
  
  .paragraph {
    font-size: 1.2rem;
    font-weight: normal;
    color: #333;
    margin-bottom: 10px;
  }
  
  .link {
    color: #2e2a67;
    font-size: 1rem;
    text-decoration: none;
    font-weight: bold;
  }
  
  .link:hover {
    text-decoration: underline;
  }
  </style>
  