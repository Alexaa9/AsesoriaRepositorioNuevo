<template>
  <div class="menu-container">
    <!-- Header -->
    <header class="header">
      <img ref="menuIcon" src="@/assets/menu.png" alt="Menú" class="menu-icon" @click="toggleMenu"/>
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </header>

    <!-- Menú desplegable -->
    <div v-show="menuOpen" class="dropdown-menu">
      <button class="dropdown-button" @click="goToPerfil">Perfil</button>
      <button class="dropdown-button" @click="goToSoliTema">Solicitud de tema</button>
      <button class="dropdown-button" @click="goToMenu">Solicitud de asesoría</button>
      <button class="dropdown-button" @click="goToNoti">Notificaciones</button>
      <button class="dropdown-button" @click="goToEvaluacion">Evaluación</button>
      <button class="dropdown-button">Salir</button>
    </div>

    <!-- Cuadro de llenado de datos -->
    <div class="data-box">
      <p class="data-title">Mis datos personales</p>
      <form @submit.prevent="guardarDatos">
        <label>Nombre:</label>
        <input type="text" v-model="nombre" required />
        
        <label>Correo:</label>
        <input type="email" v-model="correo" required />
        
        <label>Matrícula:</label>
        <input type="text" v-model="matricula" required />
        
        <button type="submit">Guardar</button>
      </form>

      <!-- Tabla para mostrar datos ingresados -->
      <table v-if="datos.length">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Matrícula</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dato in datos" :key="dato.correo">
            <td>{{ dato.nombre }}</td>
            <td>{{ dato.correo }}</td>
            <td>{{ dato.matricula }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false,
      nombre: "",
      correo: "",
      matricula: "",
      datos: []
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    guardarDatos() {
      this.datos.push({
        nombre: this.nombre,
        correo: this.correo,
        matricula: this.matricula
      });
      
      this.nombre = "";
      this.correo = "";
      this.matricula = "";
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
    goToEvaluacion() {
      this.$router.push({ name: "Evaluacion" });
    },
    goToMenu() {
      this.$router.push({ name: "MenuAsesorado" });
    },
  }
};
</script>

<style>
/* Estilos generales */
.data-box {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  max-width: 500px;
  margin: 20px auto;
}

label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  margin-top: 10px;
  background-color: #2e2a67;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #1a1a5e;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}
</style>
