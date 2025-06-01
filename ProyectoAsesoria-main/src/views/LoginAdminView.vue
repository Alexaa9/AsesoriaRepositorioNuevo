<template>
  <div>
    <header class="header">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </header>

    <div class="icon-container">
      <img src="@/assets/asesorado.png" alt="asesorado">
      <p class="bold-text">Administrador</p>
    </div>

    <section class="login-section">
      <div class="login-box">
        <h2 class="login-title">Iniciar Sesión</h2>
        <input type="text" v-model="correo" class="input-field" placeholder="Correo" />
        <input type="password" v-model="contraseña" class="input-field" placeholder="Contraseña" />
        <button @click="login" class="access-button">Acceder</button>
      </div>
    </section>
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
        const q = query(collection(db, "administradores"), where("correo", "==", this.correo), where("contraseña", "==", this.contraseña));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          this.$router.push('/menu-Admin');
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

.bold-text {
  font-weight: bold;
  font-size: 1.5rem;
  color: #0a0a0a;
}

.login-section {
  margin-top: 50px;
  text-align: center;
}

.login-box {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.input-field {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.access-button {
  background-color: #2e2a67;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  cursor: pointer;
}

.access-button:hover {
  background-color: #1a1a5e;
}

.forgot-password {
  font-size: 0.9rem;
  color: #2e2a67;
  text-decoration: underline;
  cursor: pointer;
}
</style>