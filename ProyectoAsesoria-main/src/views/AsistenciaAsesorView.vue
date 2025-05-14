<template>
    <div class="profile-container">
      
      <!-- Header -->
      <header class="header">
        <img src="@/assets/logo.png" alt="Tecnológico Nacional de México" class="logo" />
        
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

    <!-- Menú desplegable -->
    <div v-show="menuOpen" class="dropdown-menu">
      <button class="dropdown-button" @click="goToPerfil">Perfil</button>
      <button class="dropdown-button" @click="goToAsistencias">Asistencias</button>
      <button class="dropdown-button" @click="goToNoti">Notificaciones</button>
      <button class="dropdown-button" @click="goToComentarios">Comentarios</button>
      <button class="dropdown-button" @click="goToSalir">Salir</button>
    </div>
  
      <!-- Tabla de temas asignados -->
      <section class="topics-section">
        <table class="table">
          <thead>
            <tr>
              <th>Tema</th>
              <th>Nombre</th>
              <th># Control</th>
              <th>Hora</th>
              <th>Fecha Modalidad</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tema, index) in temas" :key="index">
              <td>{{ tema.nombre }}</td>
              <td>{{ tema.alumno }}</td>
              <td>{{ tema.numeroControl }}</td>
              <td>
                <span :class="tema.hora ? 'icon-check' : 'icon-cross'"></span>
              </td>
              <td>
                <span :class="tema.fechaModalidad ? 'icon-check' : 'icon-cross'"></span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: "AsistenciaAsesor",
    data() {
      return {
        menuOpen: false,
        temas: [
          { nombre: "Matemáticas Avanzadas", alumno: "Juan Pérez", numeroControl: "12345", hora: true, fechaModalidad: false },
          { nombre: "Física Aplicada", alumno: "Ana García", numeroControl: "67890", hora: true, fechaModalidad: true },
        ],
        
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
  },
    
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
  
  .title {
    font-size: 24px;
  }
  
  /* Tabla */
  .table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .table th, .table td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
  }
  
  .icon-check {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: green;
    border-radius: 50%;
  }
  
  .icon-cross {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: red;
    border-radius: 50%;
  }
  </style>