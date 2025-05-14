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
        <button class="dropdown-button" @click="goToBajaAlumno">Dar baja Alumno</button>
        <button class="dropdown-button" @click="goToBajaAsesor">Dar baja Asesor</button>
        <button class="dropdown-button" @click="goToNotiAdmin">Notificaciones</button>
        <button class="dropdown-button" @click="goToSalir">Salir</button>
      </div>
  
      <!-- Contenido principal -->
      <div class="content-container">
        <div class="text-section">
          <p class="bold-text">Encuestas</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "EncuestasAdminView",
    data() {
      return {
        menuOpen: false,
      };
    },
    methods: {
      toggleMenu() {
        this.menuOpen = !this.menuOpen;
        console.log("menuOpen:", this.menuOpen);
      },
      goToBajaAlumno() {
        this.$router.push({ name: "BajaAlumno" }); // Navega a la vista Perfil
      },
      goToBajaAsesor() {
      this.$router.push({ name: "BajaAsesor" });
    },
    goToNotiAdmin() {
      this.$router.push({ name: "MenuAdmin" });
    },
    goToSalir() {
      this.$router.push({ name: "Inicio" });
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
    justify-content: center; /* Centra el logo horizontalmente */
    align-items: center; /* Centra el logo verticalmente */
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
    top: 100px; /* justo debajo del header */
    left: 20px; /* exactamente donde está el ícono del menú */
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
  </style>
  