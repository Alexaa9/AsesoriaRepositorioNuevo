<template>
  <div class="menu-container">
    <!-- Header -->
    <header class="header">
      <img ref="menuIcon" src="@/assets/menu.png" alt="Menú" class="menu-icon" @click="toggleMenu" />
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </header>

    <!-- Menú desplegable -->
    <div v-show="menuOpen" class="dropdown-menu">
      <button class="dropdown-button" @click="goToPerfil">Perfil</button>
      <button class="dropdown-button" @click="goToSoliTema">Solicitud de tema</button>
      <button class="dropdown-button" @click="goToMenu">Solicitud de asesoría</button>
      <button class="dropdown-button" @click="goToNoti">Notificaciones</button>
      <button class="dropdown-button" @click="goToEvaluacion">Evaluación</button>
      <button class="dropdown-button" @click="goToSalir">Salir</button>
    </div>

<<<<<<< HEAD
   <div class="data-box">
  <p class="data-title">Mis datos personales</p>
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Correo</th>
        <th>Matrícula</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="dato in datosPersonales" :key="dato.correo">
        <td>{{ dato.nombre }}</td>
        <td>{{ dato.correo }}</td>
        <td>{{ dato.matricula }}</td>
      </tr>
    </tbody>
  </table>
</div>

        <div class="data-box">
          <p class="data-title">Mis datos académicos</p>
        </div>
      </div>
  
</template>

<script>
import { obtenerDatosPersonales } from "@/firebase/firestore";

    <!-- Formulario de datos -->
    <div class="data-form">
      <p class="data-title">Mis Datos Personales</p>
      <form @submit.prevent="guardarDatos">
        <label>Nombre:</label>
        <input type="text" v-model="formData.nombre" required />

        <label>Apellidos:</label>
        <input type="text" v-model="formData.apellidos" required />

        <label>Matrícula:</label>
        <input type="text" v-model="formData.matricula" required />

        <label>Carrera:</label>
        <input type="text" v-model="formData.carrera" required />

        <label>Correo:</label>
        <input type="email" v-model="formData.correo" required readonly />

        <label>Institución:</label>
        <input type="text" v-model="formData.institucion" required />

        <button type="submit" class="submit-button">Actualizar Datos</button>
      </form>
    </div>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";


export default {
  name: "PerfilAsesoradoView",
  data() {
    return {
      menuOpen: false,

      datosPersonales: [], // 🔹 Variable para almacenar los datos de la tabla
    };
  },
  async mounted() {
    this.datosPersonales = await obtenerDatosPersonales();

      formData: {
        nombre: "",
        apellidos: "",
        matricula: "",
        carrera: "",
        correo: "",
        institucion: ""
      }
    };
  },
  async mounted() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      this.formData.correo = user.email;

      // Obtener datos guardados
      const userDocRef = doc(db, "Asesorado", user.email);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        this.formData = { ...docSnap.data(), correo: user.email };
      }
    }

  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
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
    async guardarDatos() {
      try {
        const userDocRef = doc(db, "Asesorado", this.formData.correo);
        await setDoc(userDocRef, this.formData);
        alert("Datos actualizados correctamente en Firestore.");
      } catch (error) {
        console.error("Error al actualizar los datos:", error);
        alert("Hubo un error al actualizar los datos.");
      }
    }
  }
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

/* Formulario de datos */
.data-form {
  width: 60%;
  margin: 100px auto;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.data-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 1rem;
  color: #333;
  margin-top: 10px;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

.submit-button {
  margin-top: 15px;
  background-color: #2e2a67;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #1a1a5e;
}
</style>
