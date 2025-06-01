<template>
    <div>
      <!-- Header -->
      <header class="header">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
      </header>
  
      <div class="icon-container">
        <img src="@/assets/asesorado.png" alt="asesorado">
        <p class="bold-text">Administrador</p>
      </div>
  
      <!-- Título principal -->
      <div class="session-title">
        <p class="bold-text">Iniciar Sesión</p>
      </div>
  
      <!-- Sección de correo -->
      <div class="input-group">
        <label class="form-label">Correo:</label>
        <input type="text" v-model="correo" class="form-input" placeholder="Escribe tu correo" />
      </div>
  
      <!-- Sección de contraseña -->
      <div class="input-group">
        <label class="form-label">Contraseña:</label>
        <input type="password" v-model="contraseña" class="form-input" placeholder="Escribe tu contraseña" />
      </div>
  
      <button @click="login" class="crear-cuenta-button">Acceder</button>
    </div>
</template>

<script>
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

export default {
  data() {
    return {
      correo: '',
      contraseña: ''
    };
  },
  methods: {
    async login() {
      const db = getFirestore();

      try {
        // Consultar Firestore para verificar si el correo y la contraseña coinciden
        const q = query(collection(db, "administradores"), where("correo", "==", this.correo), where("contraseña", "==", this.contraseña));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          this.$router.push('/menu-Admin'); // Redirigir si el usuario es válido
        } else {
          alert('Acceso denegado. Credenciales incorrectas.');
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Hubo un problema al conectar con la base de datos.');
      }
    }
  }
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
  z-index: 100;
}

.logo {
  max-height: 80px;
  height: auto;
}

.bold-text {
  font-weight: bold;
  font-size: 1.5rem;
  color: #0a0a0a;
  margin: 0;
}

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

.icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 5px;
}

.icon-container img {
  width: 90px;
  height: 90px;
  margin-bottom: 3px;
}

.session-title {
  margin-top: 30px;
}
</style>