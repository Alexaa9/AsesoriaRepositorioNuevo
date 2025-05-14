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
              <th>Hora</th>
              <th>Fecha</th>
              <th>Modalidad</th>
              <th>Nombre</th>
              <th># Control</th>
              <th>Comentario</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tema, index) in temas" :key="index">
              <td>{{ tema.nombre }}</td>
              <td>{{ tema.hora }}</td>
              <td>{{ tema.fecha }}</td>
              <td>{{ tema.modalidad }}</td>
              <td>{{ tema.alumno }}</td>
              <td>{{ tema.numeroControl }}</td>
              <td>
                <input type="text" v-model="tema.comentario" class="input-field" placeholder="Escribe un comentario..." />
              </td>
              <td>
                <button class="send-button" @click="enviarComentario(index)">
                  <img src="@/assets/enviar.png" alt="Enviar" class="send-icon" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: "ComentariosAsesorView",
    data() {
      return {
        menuOpen: false,
        temas: [
          { nombre: "Álgebra Lineal", hora: "10:00 AM", fecha: "12/05/2025", modalidad: "Presencial", alumno: "Carlos López", numeroControl: "12345", comentario: "" },
          { nombre: "Programación Avanzada", hora: "2:00 PM", fecha: "15/05/2025", modalidad: "Virtual", alumno: "María Rodríguez", numeroControl: "67890", comentario: "" },
          { nombre: "Electromagnetismo", hora: "4:00 PM", fecha: "18/05/2025", modalidad: "Presencial", alumno: "José Martínez", numeroControl: "54321", comentario: "" },
        ],
      };
    },
    methods: {
      enviarComentario(index) {
        console.log(`Comentario enviado: ${this.temas[index].comentario}`);
        alert("Comentario enviado correctamente.");
        this.temas[index].comentario = ""; // Limpia el campo después de enviar
      },
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
  
  .input-field {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .send-button {
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .send-icon {
    width: 20px;
    height: auto;
  }
  </style>