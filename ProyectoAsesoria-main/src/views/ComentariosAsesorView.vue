<template>
  <div class="profile-container">
    <!-- Header -->
    <header class="header">
      <img ref="menuIcon" src="@/assets/menu.png" alt="Menú" class="menu-icon" @click="toggleMenu" />
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </header>

    <!-- Menú desplegable -->
    <div v-show="menuOpen" class="dropdown-menu">
      <button class="dropdown-button" @click="goToPerfil">Perfil</button>
      <button class="dropdown-button" @click="goToMenu">Mis Asesorías</button>
      <button class="dropdown-button" @click="goToNoti">Notificaciones</button>
      <button class="dropdown-button" @click="goToSalir">Salir</button>
    </div>

    <!-- Tabla de asesorados -->
    <section class="topics-section">
      <h2>Asesorados que asistieron a asesorías contigo</h2>
      <div class="table-wrapper">
        <table class="formal-table">
          <thead>
            <tr>
              <th>Tema</th>
              <th>Fecha</th>
              <th>Modalidad</th>
              <th>Alumno</th>
              <th>Número de Control</th>
              <th>Comentario</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tema, index) in temas" :key="index">
              <td>{{ tema.titulo }}</td>
              <td>{{ tema.fecha }}</td>
              <td>{{ tema.modalidad }}</td>
              <td>{{ tema.nombreAlumno }}</td>
              <td>{{ tema.matriculaAlumno }}</td>
              <td>
                <input type="text" v-model="tema.comentario" class="input-field" placeholder="Escribe un comentario..." />
              </td>
              <td>
                <button class="send-button" @click="enviarComentario(index)">
                  <img src="@/assets/enviar.png" alt="Enviar" class="send-icon" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default {
  name: "ComentariosAsesorView",
  data() {
    return {
      menuOpen: false,
      temas: []
    };
  },
  async mounted() {
    this.obtenerAsistenciasAsesorados();

    // Bloquear navegación con las flechas del navegador
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", () => {
      window.history.pushState(null, "", window.location.href);
    });
  },
  methods: {
    async obtenerAsistenciasAsesorados() {
      const nombreAsesorActual = "Alexa Espinoza Murillo";
      this.temas = [];

      try {
        const asesoradosSnapshot = await getDocs(collection(db, "Asesorado"));

        for (const docSnap of asesoradosSnapshot.docs) {
          const email = docSnap.id;
          const datosAsesorado = docSnap.data();
          const nombreAlumno = datosAsesorado.nombre || "Desconocido";
          const matriculaAlumno = datosAsesorado.matricula || "N/A";

          const confirmadasSnapshot = await getDocs(
            collection(db, "Asesorado", email, "asesoriasConfirmadas")
          );

          confirmadasSnapshot.forEach((asesoriaDoc) => {
            const data = asesoriaDoc.data();
            if (data.nombreAsesor === nombreAsesorActual) {
              this.temas.push({
                ...data,
                correoAsesorado: email,
                nombreAlumno,
                matriculaAlumno,
                comentario: ""
              });
            }
          });
        }
      } catch (error) {
        console.error("Error al obtener asesorados:", error);
      }
    },

    async enviarComentario(index) {
      const tema = this.temas[index];
      const comentario = tema.comentario.trim();

      if (comentario === "") {
        alert("El comentario no puede estar vacío.");
        return;
      }

      try {
        const observacionRef = collection(db, "Asesorado", tema.correoAsesorado, "observaciones");

        await addDoc(observacionRef, {
          mensaje: comentario,
          fecha: new Date(),
          asesor: "Alexa Espinoza Murillo",
          titulo: tema.titulo,
          fechaAsesoria: tema.fecha,
          modalidad: tema.modalidad,
          matriculaAlumno: tema.matriculaAlumno
        });

        alert("Comentario enviado correctamente.");
        this.temas[index].comentario = "";
      } catch (error) {
        console.error("Error al guardar la observación:", error);
        alert("Hubo un error al guardar el comentario.");
      }
    },

    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    goToPerfil() {
      this.$router.push({ name: "PerfilAsesor" });
    },
    goToNoti() {
      this.$router.push({ name: "NotiAsesor" });
    },
    goToMenu() {
      this.$router.push({ name: "MenuAsesor" });
    },
    goToComentarios() {
      this.$router.push({ name: "ComentariosAsesor" });
    },
    goToSalir() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$router.push({ name: "Inicio" });

          // Limpiar el historial de navegación para evitar que el usuario regrese con las flechas
          setTimeout(() => {
            window.location.replace("/");
          }, 500);
        })
        .catch((error) => {
          console.error("Error al cerrar sesión:", error);
        });
    }
  }
};
</script>


<style>
.profile-container {
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2e2a67;
  color: white;
  padding: 20px;
}

.logo {
  width: 200px;
}

.menu-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.dropdown-menu {
  background-color: #f4f4f4;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}

.dropdown-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: white;
  border: none;
  text-align: left;
  cursor: pointer;
  font-weight: bold;
}

.dropdown-button:hover {
  background-color: #ddd;
}

.topics-section h2 {
  text-align: center;
  margin-bottom: 20px;
}

.table-wrapper {
  overflow-x: auto;
}

.formal-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.formal-table th {
  background-color: #2e2a67;
  color: white;
  padding: 12px;
  text-align: center;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
}

.formal-table td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.formal-table tr:hover {
  background-color: #f9f9f9;
}

.input-field {
  width: 90%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.send-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.send-icon {
  width: 24px;
  height: auto;
}
</style>
