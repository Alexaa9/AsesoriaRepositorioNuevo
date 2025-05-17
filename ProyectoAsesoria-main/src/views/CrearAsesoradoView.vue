<template>
  <div>
    <!-- Header -->
    <header class="header">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </header>

    <!-- Título principal -->
    <div class="icon-container">
      <p class="bold-text">Crear cuenta nueva</p>
    </div>

    <!-- Sección de matrícula -->
    <div class="input-group">
      <label class="form-label">Matrícula:</label>
      <input v-model="matricula" type="text" class="form-input" placeholder="Escribe tu matrícula" />
    </div>

    <!-- Sección de correo -->
    <div class="input-group">
      <label class="form-label">Correo:</label>
      <input v-model="email" type="email" class="form-input" placeholder="Escribe tu correo" />
    </div>

    <!-- Sección de contraseña -->
    <div class="input-group">
      <label class="form-label">Contraseña:</label>
      <input v-model="password" type="password" class="form-input" placeholder="Escribe tu contraseña" />
    </div>

    <!-- Sección de confirmar contraseña -->
    <div class="input-group">
      <label class="form-label">Confirmar contraseña:</label>
      <input v-model="confirmPassword" type="password" class="form-input" placeholder="Confirma tu contraseña" />
    </div>

    <button @click="handleRegister" class="crear-cuenta-button">Crear cuenta</button>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseConfig";

export default {
  data() {
    return {
      matricula: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  methods: {
    async handleRegister() {
      if (this.password !== this.confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }

      try {
        // Registrar usuario en Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;
        console.log("Usuario registrado:", user.uid);

        // Guardar datos en Firestore
        await addDoc(collection(db, "Asesorado"), {
          uid: user.uid,
          matricula: this.matricula,
          correo: this.email
        });

        alert("Cuenta creada exitosamente");
        this.$router.push("/login-alumno");
      } catch (error) {
        alert("Error al crear cuenta: " + error.message);
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
  