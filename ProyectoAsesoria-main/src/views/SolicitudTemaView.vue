<template>
  <div class="menu-container">
    <!-- Header -->
    <header class="header">
      <img
        ref="menuIcon"
        src="@/assets/menu.png"
        alt="Menú"
        class="menu-icon"
        @click="toggleMenu"
      />
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </header>

    <!-- Menú desplegable -->
    <div v-show="menuOpen" class="dropdown-menu">
      <button class="dropdown-button" @click="goToPerfil">Perfil</button>
      <button class="dropdown-button">Solicitud de tema</button>
      <button class="dropdown-button" @click="goToMenu">Búsqueda de Asesorías</button>
      <button class="dropdown-button" @click="goToNoti">Notificaciones</button>
      <button class="dropdown-button" @click="goToEvaluacion">Evaluación</button>
      <button class="dropdown-button">Salir</button>
    </div>

    <!-- Contenido principal -->
    <div class="content-container">
      <div class="text-section">
        <p class="bold-text">Solicitud de Tema</p>
      </div>

      <div class="paragraph-section">
        <p class="paragraph">
          Si requieres de una asesoría que no se encuentra en este sitio, por favor envía tu solicitud.
        </p>

        <div class="input-group">
          <label class="form-label">Materia:</label>
          <input v-model="materia" type="text" class="form-input" placeholder="Escribe aquí..." />
        </div>

        <div class="input-group">
          <label class="form-label">Tema:</label>
          <input v-model="tema" type="text" class="form-input" placeholder="Escribe aquí..." />
        </div>

        <div class="input-group">
          <label class="form-label">Urgencia:</label>
          <select v-model="urgencia" class="form-select">
            <option value="">Selecciona la urgencia...</option>
            <option value="De inmediato">De inmediato</option>
            <option value="Medio">Medio</option>
            <option value="Bajo">Bajo</option>
          </select>
        </div>

        <div class="input-group">
          <label class="form-label">Hora de la asesoría:</label>
          <input v-model="hora" type="time" class="form-input" />
        </div>

        <div class="input-group">
          <label class="form-label">Fecha de la asesoría:</label>
          <input v-model="fechaSeleccionada" type="date" class="form-input" />
        </div>
      </div>

      <div class="button-section">
        <button class="send-button" @click="enviarSolicitud">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, addDoc } from "firebase/firestore";

export default {
  name: "SolicitudTema",
  data() {
    return {
      menuOpen: false,
      materia: "",
      tema: "",
      urgencia: "",
      hora: "",
      fechaSeleccionada: ""
    };
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
    goToEvaluacion() {
      this.$router.push({ name: "Evaluacion" });
    },
    goToMenu() {
      this.$router.push({ name: "MenuAsesorado" });
    },
    async enviarSolicitud() {
      if (!this.materia || !this.tema || !this.urgencia || !this.hora || !this.fechaSeleccionada) {
        alert("Por favor, llena todos los campos.");
        return;
      }

      try {
        const db = getFirestore();
        const solicitudesRef = collection(db, "Asesorias", "Solicitudes", "solicitudes");

        await addDoc(solicitudesRef, {
          materia: this.materia,
          tema: this.tema,
          urgencia: this.urgencia,
          hora: this.hora,
          fechaAsesoria: this.fechaSeleccionada,
          fechaSolicitud: new Date().toISOString()
        });

        alert("Solicitud enviada correctamente.");

        // Limpiar campos
        this.materia = "";
        this.tema = "";
        this.urgencia = "";
        this.hora = "";
        this.fechaSeleccionada = "";
      } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        alert("Hubo un error al enviar la solicitud.");
      }
    }
  }
};
</script>

<style>
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
  width: 40px;
  height: auto;
  cursor: pointer;
}

.logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  max-height: 80px;
  height: auto;
}

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
  display: block;
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

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 140px;
  height: auto;
}

.paragraph-section {
  margin-top: 20px;
  width: 100%;
  text-align: center;
}

.paragraph {
  font-size: 1.2rem;
  font-weight: normal;
  color: #333;
  margin-bottom: 10px;
}

.input-group {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 10px;
}

.form-select,
.form-input {
  width: 250px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.button-section {
  text-align: center;
  margin-top: 20px;
  background-color: #2e2a67;
}

.send-button {
  background-color: #2e2a67;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
}

.send-button:hover {
  background-color: #d3d3d3;
}
</style>
