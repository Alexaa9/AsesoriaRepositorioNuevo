<template>
  <div>
    <header class="header">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </header>

    <header class="header">
      <img ref="menuIcon" src="@/assets/menu.png" alt="Menú" class="menu-icon" @click="toggleMenu" />
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </header>

    <div v-show="menuOpen" class="dropdown-menu">
      <button class="dropdown-button" @click="goToMenuAdmin">Inicio</button>
      <button class="dropdown-button" @click="goToBajaAlumn">Dar de baja Alumno</button>
      <button class="dropdown-button" @click="goToNoti">Notificaciones</button>
      <button class="dropdown-button" @click="goToSalir">Salir</button>
    </div>

    <div class="icon-container">
      <p class="bold-text">Dar Baja Asesor</p>
    </div>

    <div class="input-group">
      <label class="form-label">Correo del Asesor:</label>
      <input v-model="correoAsesor" type="text" class="form-input" placeholder="Escribe el correo del asesor" />
    </div>

    <button class="crear-cuenta-button" @click="eliminarAsesor">Eliminar Asesor</button>
  </div>
</template>

<script>
import { getFirestore, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";

export default {
  name: "MenuAdminView",
  data() {
    return {
      menuOpen: false,
      correoAsesor: "" // Captura el correo del asesor
    };
  },

  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    goToMenuAdmin() {
      this.$router.push({ name: "MenuAdmin" });
    },
    goToBajaAlumn() {
      this.$router.push({ name: "BajaAlumno" });
    },
    goToNoti() {
      this.$router.push({ name: "MenuAdmin" });
    },
    goToSalir() {
      this.$router.push({ name: "Inicio" });
    },

    async eliminarAsesor() {
      const correoLimpio = this.correoAsesor.trim().toLowerCase(); // ✅ Limpieza del correo

      if (!correoLimpio) {
        alert("Por favor, ingresa un correo válido.");
        return;
      }

      const db = getFirestore();
      const asesoresRef = collection(db, "Asesores"); 

      try {
        // 🔍 **Busca el asesor por su email**
        const q = query(asesoresRef, where("email", "==", correoLimpio));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          alert("No se encontraron datos para este asesor.");
          return;
        }

        // 🗑 **Eliminar el documento**
        querySnapshot.forEach(async (docSnapshot) => {
          await deleteDoc(docSnapshot.ref);
        });

        console.log("✅ Asesor eliminado de Firestore.");
        alert("✅ El asesor ha sido eliminado correctamente.");
        this.correoAsesor = ""; // Limpia el input

      } catch (error) {
        console.error("❌ Error al eliminar el asesor:", error);
        alert("Hubo un problema al eliminar el asesor.");
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
  align-items: center;
  padding-left: 20px;
  height: 100px;
  z-index: 10;
}

.logo {
  max-height: 80px;
}

.icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 140px;
}

.bold-text {
  font-weight: bold;
  font-size: 1.5rem;
  color: #0a0a0a;
}

.input-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
}

.form-label {
  font-size: 1rem;
  font-weight: bold;
  color: black;
}

.form-input {
  width: 80%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.crear-cuenta-button {
  background-color: #d9534f;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
}
</style>
