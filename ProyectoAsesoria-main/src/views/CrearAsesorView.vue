<template>
  <div>
    <header class="header">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </header>

    <div class="icon-container">
      <p class="bold-text">Crear cuenta nueva de Asesor</p>
    </div>

    <!-- Formulario de registro -->
    <div class="input-group">
      <label class="form-label">Numero empleado:</label>
      <input type="text" v-model="numeroEmpleado" class="form-input" placeholder="Escribe tu numero de empleado" />
    </div>

    <div class="input-group">
      <label class="form-label">Correo:</label>
      <input type="text" v-model="email" class="form-input" placeholder="Escribe tu correo" />
    </div>

    <div class="input-group">
      <label class="form-label">Contraseña:</label>
      <input type="password" v-model="password" class="form-input" placeholder="Escribe tu contraseña" />
    </div>

    <div class="input-group">
      <label class="form-label">Confirmar contraseña:</label>
      <input type="password" v-model="confirmPassword" class="form-input" placeholder="Confirma tu contraseña" />
    </div>

    <button @click="registerUser" class="crear-cuenta-button">Crear cuenta</button>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseConfig"; // Importa la configuración de Firebase

export default {
  data() {
    return {
      numeroEmpleado: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  methods: {
    async registerUser() {
      if (this.password !== this.confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
      }

      try {
        // Registrar usuario en Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;

        // Guardar información adicional en Firestore
        await setDoc(doc(db, "Asesores", user.uid), {
          numeroEmpleado: this.numeroEmpleado,
          email: this.email,
          createdAt: new Date()
        });

        alert("Cuenta creada exitosamente.");
        this.$router.push("/login-asesor"); // Redirigir al usuario
      } catch (error) {
        alert("Error al crear la cuenta: " + error.message);
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
    max-width: 600px;
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
  
  /* Botón Crear Cuenta */
  .button-section {
    text-align: center;
    margin-top: 20px;
  }
  
  .crear-cuenta-button {
    background-color: #2e2a67;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
  }
  
  .crear-cuenta-button:hover {
    background-color: #1a1a5e;
  }
  </style>
  