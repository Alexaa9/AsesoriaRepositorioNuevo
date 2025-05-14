<template>
  <div>
    <!-- Header -->
    <header class="header">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </header>

    <!-- Texto y botones -->
    <section class="content">
      <!-- Título principal -->
      <h1 class="title">
        Entrar a las Aulas del Instituto Tecnológico en Ensenada
      </h1>
      <!-- Subtítulo -->
      <p class="subtitle">Selecciona el perfil</p>

      <!-- Botones -->
      <div class="buttons-container">
        <router-link to="/login-alumno" class="button">Alumno</router-link>
        <router-link to="/login-asesor" class="button">Asesor</router-link>
        <router-link to="/login-Admin" class="button">Administrador</router-link>
      
      </div>
    </section>
  </div>
</template>

<script>
import api from '@/api/axios'; //  verificar Axios esté configurado correctamente

export default {
  name: "InicioView",
  data() {
    return {
      connectionMessage: '', // Para almacenar el mensaje del backend
    };
  },
  methods: {
    async checkConnection() {
      try {
        const response = await api.get('/prueba'); // Ruta de prueba en el backend
        this.connectionMessage = response.data.message;
      } catch (error) {
        console.error('Error al conectar con el backend:', error);
        this.connectionMessage = 'Error al conectar con el backend';
      }
    },
  },
  created() {
    this.checkConnection(); // Verificar la conexión al cargar el componente
  },
};
</script>

<style>
/* Header pegado arriba */
.header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #2e2a67; /* Azul marino */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  z-index: 10; /* Asegura que el header siempre esté visible */
}

/* Logo pequeño en el header */
.logo {
  max-height: 80px;
  height: auto;
}

/* Contenedor principal */
.content {
  margin-top: 120px; /* Espaciado para que no se solape con el header */
  text-align: center;
}

/* Título principal */
.title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2e2a67; /* Azul marino */
  margin-bottom: 10px;
  height: 100px;
}

/* Subtítulo */
.subtitle {
  font-size: 1rem;
  color: #444; /* Gris oscuro para contraste */
  margin-bottom: 20px;
}

/* Contenedor de botones */
.buttons-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Botones con fondo azul marino */
.button {
  width: 200px;
  margin-bottom: 10px;
  background-color: #2e2a67; /* Azul marino */
  color: white; /* Texto blanco para contraste */
  border: none;
  border-radius: 25px; /* Bordes redondeados */
  padding: 10px;
  font-size: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra sutil */
  transition: transform 0.2s, background-color 0.2s;
}

/* Efecto hover para los botones */
.button:hover {
  transform: scale(1.05);
  background-color: #1a1a5e; /* Azul más oscuro en hover */
}
/* Mensaje de conexión */
.connection-message {
  margin-top: 20px;
  font-size: 1rem;
  color: #2e2a67;
  font-weight: bold;
}
</style>
