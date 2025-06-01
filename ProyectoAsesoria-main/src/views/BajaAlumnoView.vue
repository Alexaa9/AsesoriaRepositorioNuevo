<template>
  <div>
    <header class="header">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <img ref="menuIcon" src="@/assets/menu.png" alt="Menú" class="menu-icon" @click="toggleMenu" />
    </header>

    <div v-show="menuOpen" class="dropdown-menu">
      <button class="dropdown-button" @click="goToMenuAdmin">Inicio</button>
      <button class="dropdown-button" @click="goToBajaAsesor">Dar Baja Asesor</button>
      <button class="dropdown-button" @click="goToNoti">Notificaciones</button>
      <button class="dropdown-button" @click="goToSalir">Salir</button>
    </div>

    <div class="icon-container">
      <p class="bold-text">Dar Baja Alumno</p>
    </div>

    <div class="input-group">
      <label class="form-label">Correo del Alumno:</label>
      <input v-model="correoAlumno" type="text" class="form-input" placeholder="Escribe el correo" />
    </div>

    <button class="crear-cuenta-button" @click="eliminarAlumno">Eliminar Alumno</button>
  </div>
</template>

<script>
import { getFirestore, doc, getDoc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { getAuth, deleteUser } from "firebase/auth";

export default {
  data() {
    return {
      menuOpen: false,
      correoAlumno: "", // Campo para capturar el correo
    };
  },

  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    goToBajaAsesor() {
      this.$router.push({ name: "BajaAsesor" });
    },
    goToNoti() {
        this.$router.push({ name: "MenuAdmin" });
      },
      goToMenuAdmin() {
        this.$router.push({ name: "MenuAdmin" });
      },
    goToSalir() {
      this.$router.push({ name: "Inicio" });
    },
    

    async eliminarAlumno() {
      if (!this.correoAlumno) {
        alert("Por favor, ingresa un correo válido.");
        return;
      }

      const db = getFirestore();
      const auth = getAuth();

      try {
        // **1️⃣ Buscar el usuario en Firestore y obtener su UID**
        const alumnoRef = doc(db, "Asesorado", this.correoAlumno);
        const alumnoSnap = await getDoc(alumnoRef);

        if (!alumnoSnap.exists()) {
          alert("No se encontraron datos para este alumno.");
          return;
        }

        const uid = alumnoSnap.data().uid; // Obtener UID antes de eliminar
        await deleteDoc(alumnoRef);
        console.log("✅ Datos del alumno eliminados de Firestore.");

        // **2️⃣ Eliminar todas sus asesorías confirmadas**
        const asesoriasRef = collection(db, "Asesorado", this.correoAlumno, "asesoriasConfirmadas");
        const asesoriasSnap = await getDocs(asesoriasRef);
        asesoriasSnap.forEach(async (docSnapshot) => {
          await deleteDoc(doc(db, "Asesorado", this.correoAlumno, "asesoriasConfirmadas", docSnapshot.id));
        });
        console.log("✅ Asesorías confirmadas eliminadas.");

        // **3️⃣ Obtener usuario en Firebase Authentication y eliminarlo**
        const user = auth.currentUser;
        if (user && user.uid === uid) {
          await deleteUser(user);
          console.log("✅ Usuario eliminado de Firebase Authentication.");
        } else {
          console.warn("⚠ No se encontró el usuario en Firebase Authentication.");
        }

        alert("✅ El alumno ha sido eliminado correctamente.");
        this.correoAlumno = ""; // Limpiar el campo después de eliminar
      } catch (error) {
        console.error("❌ Error al eliminar el usuario:", error);
        alert("Hubo un problema al eliminar el usuario.");
      }
    },
  },
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
