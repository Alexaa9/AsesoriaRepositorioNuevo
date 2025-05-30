<template>
  <div class="menu-container">
    <!-- Encabezado -->
    <header class="header">
      <img ref="menuIcon" src="@/assets/menu.png" alt="Menú" class="menu-icon" @click="toggleMenu" />
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </header>

    <!-- Menú desplegable -->
    <div v-show="menuOpen" class="dropdown-menu">
      <button class="dropdown-button" @click="goToPerfil">Perfil asesor</button>
      <button class="dropdown-button" @click="goToMenu">Mis asesorías</button>
      <button class="dropdown-button" @click="goToAsistencias">Asistencias</button>
      <button class="dropdown-button" @click="goToComentarios">Comentarios</button>
      <button class="dropdown-button" @click="goToSalir">Salir</button>
    </div>

    <!-- Formulario de datos -->
    <div class="data-box">
      <p class="data-title">Mis datos personales</p>
      <form @submit.prevent="guardarDatos">
        <label>Correo:</label>
        <input type="email" v-model="formData.correo" required readonly />

        <label>Nombre:</label>
        <input type="text" v-model="formData.nombre" required />

        <label>Apellidos:</label>
        <input type="text" v-model="formData.apellidos" required />

        <label>Profesión:</label>
        <input type="text" v-model="formData.profesion" required />

        <label>Escuela donde se tituló:</label>
        <input type="text" v-model="formData.escuela" required />

        <button type="submit">Guardar</button>
      </form>
    </div>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

export default {
  name: "PerfilAsesorView",
  data() {
    return {
      menuOpen: false,
      formData: {
        correo: "",
        nombre: "",
        apellidos: "",
        profesion: "",
        escuela: ""
      }
    };
  },
  async mounted() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      this.formData.correo = user.email;
      const userDocRef = doc(db, "Asesores", user.email);
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
    async guardarDatos() {
      try {
        const userDocRef = doc(db, "Asesores", this.formData.correo);
        await setDoc(userDocRef, this.formData);
        alert("Datos guardados correctamente en Firestore.");
      } catch (error) {
        console.error("Error al guardar los datos:", error);
        alert("Hubo un error al guardar los datos.");
      }
    },
    goToPerfil() {
      this.$router.push({ name: "PerfilAsesor" });
    },
    goToMenu() {
      this.$router.push({ name: "MenuAsesor" });
    },
    goToAsistencias() {
      this.$router.push({ name: "Asistencias" });
    },
    goToComentarios() {
      this.$router.push({ name: "ComentariosAsesor" });
    },
    goToSalir() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$router.push({ name: "Login" });
        })
        .catch((error) => {
          console.error("Error al cerrar sesión:", error);
        });
    }
  }
};
</script>

<style scoped>
.menu-container {
  position: relative;
}

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

.menu-icon {
  position: absolute;
  left: 20px;
  width: 30px;
  cursor: pointer;
}

.logo {
  height: 60px;
}

.dropdown-menu {
  position: fixed;
  top: 100px;
  left: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  z-index: 200;
  display: flex;
  flex-direction: column;
}

.dropdown-button {
  width: 100%;
  background-color: #2e2a67;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  text-align: left;
}

.dropdown-button:hover {
  background-color: #1a1a5e;
}

.data-box {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  max-width: 500px;
  margin: 120px auto 40px;
}

.data-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2e2a67;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
  text-align: left;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button[type="submit"] {
  margin-top: 15px;
  background-color: #2e2a67;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
}

button[type="submit"]:hover {
  background-color: #1a1a5e;
}
</style>
