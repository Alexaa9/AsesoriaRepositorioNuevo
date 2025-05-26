<template>
  <div class="menu-container">
    <!-- Encabezado -->
    <header class="header">
      <img ref="menuIcon" src="@/assets/menu.png" alt="Menú" class="menu-icon" @click="toggleMenu" />
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </header>

    <!-- Menú desplegable -->
    <div v-show="menuOpen" class="dropdown-menu">
      <button class="dropdown-button" @click="goToSoliTema">Solicitud de tema</button>
      <button class="dropdown-button" @click="goToMenu">Búsqueda de Asesorías</button>
      <button class="dropdown-button" @click="goToNoti">Notificaciones</button>
      <button class="dropdown-button" @click="goToEvaluacion">Evaluación</button>
      <button class="dropdown-button" @click="goToSalir">Salir</button>
    </div>

    <!-- Contenido principal -->
    <div class="content-container">
      <div class="horizontal-section">
        <div class="profile-container">
          <button class="profile-button" @click="goToPerfil">
            <img src="@/assets/asesorado.png" alt="Perfil" class="profile-icon" />
          </button>
          <p class="profile-name">{{ userFullName }}</p>
        </div>

        <p class="bold-text">Búsqueda de Asesoría</p>

        <div class="notification-container">
          <button class="notification-button" @click="goToNoti">
            <img src="@/assets/notificacion.png" alt="Notificación" class="notification-icon" />
          </button>
          <p class="notification-text">Mis notificaciones</p>
        </div>
      </div>

      <!-- Barra de búsqueda -->
      <div class="search-input-wrapper">
        <img src="@/assets/buscador.png" alt="Buscar" class="search-icon" />
        <input 
          type="text" 
          v-model="searchQuery" 
          class="search-input" 
          placeholder="Escribe aquí tu búsqueda..." 
          @input="searchAsesoria"
        />
      </div>

<<<<<<< HEAD
      <div class="calendar-container">
  <iframe 
    src="https://calendar.google.com/calendar/embed?src=tucorreo@gmail.com&ctz=America/Mexico_City"
    style="border: 0"
    width="800"
    height="600"
    frameborder="0"
    scrolling="no">
  </iframe>

  <button @click="openGoogleCalendar" class="access-button">
    Abrir Google Calendar
  </button>
</div>

=======
      <!-- Lista de asesorías confirmadas -->
      <div class="confirmed-asesorias">
        <h3>Asesorías Confirmadas</h3>
        <ul v-if="confirmedAsesorias.length">
          <li v-for="(asesoria, index) in confirmedAsesorias" :key="index">
            <p><strong>Título:</strong> {{ asesoria.titulo }}</p>
            <p><strong>Descripción:</strong> {{ asesoria.descripcion }}</p>
            <p><strong>Fecha:</strong> {{ asesoria.fecha }}</p>
            <p><strong>Hora:</strong> {{ asesoria.hora }}</p>
            <p><strong>Asesor:</strong> {{ asesoria.asesor }}</p>
            <button @click="eliminarAsesoriaConfirmada(index)" class="delete-button">Eliminar</button>
          </li>
        </ul>
        <p v-else>No hay asesorías confirmadas.</p>
      </div>

      <!-- Resultados -->
      <div v-if="asesorias.length" class="result-container">
        <ul>
          <li v-for="(asesoria, index) in asesorias" :key="index">
            <div>
              <strong>{{ asesoria.titulo }}</strong> - {{ asesoria.descripcion }}
            </div>
            <div>
              <button class="confirm-button" @click="confirmAsesoria(asesoria)">Confirmar</button>
              <button class="delete-button" @click="deleteAsesoria(index)">❌</button>
            </div>
          </li>
        </ul>
      </div>

      <div v-else-if="searchQuery">
        <p>No se encontraron asesorías.</p>
      </div>

      <!-- Calendario -->
      <div class="calendar-container">
        <iframe 
          :src="calendarUrl"
          style="border: 0"
          width="800"
          height="600"
          frameborder="0"
          scrolling="no">
        </iframe>
        <button @click="openGoogleCalendar" class="access-button">Abrir Google Calendar</button>
      </div>
>>>>>>> a0d9eff (Asesorado y asesor casi terminados)
    </div>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import { doc, getDoc, collection, query, getDocs, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

export default {
  name: "MenuAsesoradoView",
  data() {
    return {
      menuOpen: false,
      userEmail: "",
      userFullName: "Nombre completo",
      calendarUrl: "",
      searchQuery: "",
      asesorias: [],
      confirmedAsesorias: [] // 🔹 Almacena todas las asesorías confirmadas
    };
  },
  async mounted() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      this.userEmail = user.email;
      this.calendarUrl = `https://calendar.google.com/calendar/embed?src=${this.userEmail}&ctz=America/Mexico_City`;

      const userDocRef = doc(db, "Asesorado", user.email);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        this.userFullName = `${docSnap.data().nombre} ${docSnap.data().apellidos}`;
      }
    }

    // Recuperar asesorías confirmadas de localStorage
    const savedAsesorias = localStorage.getItem("confirmedAsesorias");
    if (savedAsesorias) {
      this.confirmedAsesorias = JSON.parse(savedAsesorias);
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
    goToMenu() {
      this.$router.push({ name: "MenuAsesorado" });
    },
    goToEvaluacion() {
      this.$router.push({ name: "Evaluacion" });
    },
    goToSoliTema() {
      this.$router.push({ name: "SolicitudTema" });
    },
    goToSalir() {
      this.$router.push({ name: "Inicio" });
    },
    openGoogleCalendar() {
      window.open(this.calendarUrl, "_blank");
    },
    async searchAsesoria() {
      try {
        const asesoriasRef = collection(db, "Asesorias");

        let q;
        if (this.searchQuery) {
          q = query(asesoriasRef, where("titulo", ">=", this.searchQuery), where("titulo", "<=", this.searchQuery + "\uf8ff"));
        } else {
          q = asesoriasRef;
        }

        const querySnapshot = await getDocs(q);
        this.asesorias = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error("Error buscando asesorías:", error);
      }
    },
    confirmAsesoria(asesoria) {
      this.confirmedAsesorias.push(asesoria);
      localStorage.setItem("confirmedAsesorias", JSON.stringify(this.confirmedAsesorias));
    },
    eliminarAsesoriaConfirmada(index) {
      this.confirmedAsesorias.splice(index, 1);
      localStorage.setItem("confirmedAsesorias", JSON.stringify(this.confirmedAsesorias));
    }
  }
};
</script>


<style>
.search-input-wrapper {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
}

.search-input {
  width: 100%;
  padding: 12px 40px;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid #ccc;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
}

.confirm-button {
  background-color: #4caf50;
  color: white;
  border: none;
  margin-right: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.confirm-button:hover {
  background-color: #45a049;
}

.delete-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #d32f2f;
}

.confirmed-asesoria {
  background-color: #e8f5e9;
  padding: 15px;
  border-radius: 10px;
  margin-top: 20px;
  border: 1px solid #c8e6c9;
  text-align: center;
}
</style>
