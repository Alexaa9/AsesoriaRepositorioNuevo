<template>
    <div>
      <!-- Header -->
      <header class="header">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
      </header>
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
  
      <div
        v-show="menuOpen"
        class="dropdown-menu"
      >
        <button class="dropdown-button" @click="goToBajaAsesor">Dar baja asesor</button>
        <button class="dropdown-button" @click="goToBajaAlumn">Dar de baja Alumno</button>
        <button class="dropdown-button" @click="goToNoti">Notificaciones</button>
        <button class="dropdown-button" @click="goToEncuestas">Encuestas</button>
        <button class="dropdown-button" @click="goToSalir">Salir</button>
      </div>
  
      <!-- Título principal -->
      <div class="icon-container">
        <p class="bold-text">Dar Baja Asesor</p>
      </div>
  
      <!-- Sección de matrícula -->
      <div class="input-group">
        <label class="form-label">Materia:</label>
        <input type="text" class="form-input" placeholder="Escribe la materia" />
      </div>
  
      <!-- Sección de correo -->
      <div class="input-group">
        <label class="form-label">Tema:</label>
        <input type="text" class="form-input" placeholder="Escribe el tema" />
      </div>
  
      <!-- Sección de contraseña -->
      <div class="input-group">
        <label class="form-label">Modalidad:</label>
        <input type="password" class="form-input" placeholder="Escribe la modalidad" />
      </div>
  
      <!-- Sección de confirmar contraseña -->
      <div class="input-group">
        <label class="form-label">Nombre:</label>
        <input type="password" class="form-input" placeholder="Escribe el nombre" />
      </div>
      
  <button class="crear-cuenta-button">Enviar</button>


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
        console.log("menuOpen:", this.menuOpen);
      },
      goToBajaAsesor() {
        this.$router.push({ name: "BajaAsesor" });
      },
      goToNoti() {
        this.$router.push({ name: "MenuAdmin" });
      },
      goToBajaAlumn() {
        this.$router.push({ name: "BajaAlumno" });
      },
      goToEncuestas() {
        this.$router.push({ name: "EncuestasAdmin" });
      },
      goToSalir() {
        this.$router.push({ name: "Inicio" });
      },
      
    
    },
  };
  </script>
  <style>
  /* Header */
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #2e2a67;
    display: flex;
    justify-content: left;
    align-items: center;
    padding-left: 20px;
    height: 100px;
    z-index: 10;
  }
  
  .logo {
    max-height: 80px;
    height: auto;
  }
  
  /* Título principal */
  .icon-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 140px;
    margin-bottom: 10px;
  }
  
  .bold-text {
    font-weight: bold;
    font-size: 1.5rem;
    color: #0a0a0a;
    margin: 0;
  }
  
  /* Grupo de entrada */
  .input-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px auto;
    max-width: 400px;
    padding: 5px;
  }
  
  .form-label {
    font-size: 1rem;
    color: black;
    font-weight: bold;
    width: 30%;
    text-align: left;
  }
  
  .form-input {
    width: 65%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  </style>
  