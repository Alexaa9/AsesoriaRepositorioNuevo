<template>
  <div>
    <!-- Header -->
    <header class="header">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </header>

    <div class="icon-container">
      <img src="@/assets/asesorado.png" alt="asesorado" />
      <p class="bold-text">Asesorado</p>
    </div>

    <!-- Sección de inicio de sesión -->
    <section class="login-section">
      <div class="login-box">
        <h2 class="login-title">Iniciar Sesión</h2>
        <input type="text" v-model="email" class="input-field" placeholder="Correo" />
        <input type="password" v-model="password" class="input-field" placeholder="Contraseña" />
        <button @click="handleLogin" class="access-button">Acceder</button>
        <a href="\recuperar-Asesorado" class="forgot-password">Olvidé mi contraseña</a>
      </div>
    </section>

    <!-- Sección de registro -->
    <section class="register-section">
      <h2 class="register-title">Registrarse como usuario nuevo para solicitar asesorías</h2>
      <p class="register-instructions">
        Crea una cuenta para poder acceder a las asesorías presionando el botón.
      </p>
      <router-link to="/crear-Asesorado" class="create-account-button">Crear cuenta nueva</router-link>
      <p class="support-info">
        Si tienes problemas, envía un correo a
        <a href="mailto:plataforma_ite@ite.edu.mx">plataforma_ite@ite.edu.mx</a>
      </p>
    </section>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseConfig";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async handleLogin() {
      try {
        console.log("Correo ingresado:", this.email);
        console.log("Contraseña ingresada:", this.password);

        // Autenticación en Firebase
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;

        // Validar si el usuario existe en Firestore
        const userDocRef = doc(db, "Asesorado", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          console.log("No se encontró el usuario en Firestore.");
          await setDoc(userDocRef, { email: user.email, createdAt: new Date() });
          alert("Usuario registrado en Firebase, pero agregado a Firestore.");
        }

        alert("Inicio de sesión exitoso.");
        this.$router.push("/menu-Asesorado");

      } catch (error) {
        console.error("Error de autenticación:", error.message);
        alert("Error de autenticación: " + error.message);
      }
    }
  }
};
</script>

<style>
/* Estilos */
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

.register-section {
  margin: 40px auto;
  text-align: center;
}

.create-account-button {
  background-color: #2e2a67;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.create-account-button:hover {
  background-color: #1a1a5e;
}

.bold-text {
  font-weight: bold;
  font-size: 1.5rem;
  color: #0a0a0a;
}

.icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 140px;
}
</style>
