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
        <button class="dropdown-button" @click="goToPerfil">Perfil Asesor</button>
        <button class="dropdown-button">Solicitud de tema asesor</button>
        <button class="dropdown-button" @click="goToNoti">Notificaciones asesor</button>
        <button class="dropdown-button">Salir</button>
      </div>
  
      <!-- Contenido principal -->
      <div class="content-container">
        <div class="text-section">
          <p class="bold-text">Solicitud de Tema Asesor</p>
        </div>
  
        <!-- Párrafo adicional y campo de texto -->
        <div class="paragraph-section">
          <p class="paragraph">Si requieres de una asesoría que no se encuentra en este sitio, por favor envía tu solicitud.</p>
          <div class="input-group">
            <label class="form-label">Materia:</label>
            <input type="text" class="form-input" placeholder="Escribe aquí..." />
          </div>
          <div class="input-group">
            <label class="form-label">Tema:</label>
            <input type="text" class="form-input" placeholder="Escribe aquí..." />
          </div>
          <div class="input-group">
            <label class="form-label">Urgencia:</label>
            <input type="text" class="form-input" placeholder="Escribe aquí..." />
          </div>
        </div>
  
        <!-- Botón Enviar -->
        <div class="button-section">
          <button class="send-button">Enviar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "SolicitudTemaAsesorView",
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
        this.$router.push({ name: "PerfilAsesor" });
      },
      goToNoti() {
        this.$router.push({ name: "NotiAsesor" });
      },
      goToMenu() {
        this.$router.push({ name: "MenuAsesor" });
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
  
  /* Párrafo adicional */
  .paragraph-section {
    margin-top: 20px;
    width: 100%;
    text-align: center;
  }
  
  .paragraph {
    font-size: 1.2rem;
    font-weight: normal;
    color: #333;
    margin-bottom: 10px;
  }
  
  /* Grupo de entrada */
  .input-group {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  
  .form-label {
    font-size: 1rem;
    color: black;
    font-weight: bold;
  }
  
  .form-input {
    width: 250px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  /* Botón Enviar */
  .button-section {
    text-align: center;
    margin-top: 20px;
  }
  
  .send-button {
    background-color: #2e2a67;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
  }
  
  .send-button:hover {
    background-color: #1a1a5e;
  }
  </style>
  