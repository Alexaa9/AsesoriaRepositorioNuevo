<template>
    <div>
      <!-- Header -->
      <header class="header">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
      </header>

      <div class="icon-container">
  <img src="@/assets/asesorado.png" alt="asesorado">
  <p class="bold-text">Asesor</p>
</div>
      <!-- Sección de inicio de sesión -->
      <section class="login-section">
        <div class="login-box">
          <h2 class="login-title">Iniciar Sesión</h2>
          <input type="text" class="input-field" placeholder="Número de empleado" />
          <input type="password" class="input-field" placeholder="Contraseña" />
          <router-link to="/menu-asesor"><button class="access-button">Acceder</button></router-link><br>
          <a href="\recuperar-asesor" class="forgot-password">Olvidé mi contraseña</a>
        </div>
      </section>
  
      <!-- Sección de registro -->
      <section class="register-section">
        <h2 class="register-title">
          Registrarse como usuario nuevo para solicitar asesorías
        </h2>
        <p class="register-instructions">
          Crea una cuenta para poder acceder a las asesorías presionando el botón.
        </p>
        <router-link to="/crear-Asesor" class="create-account-button">Crear cuenta nueva</router-link>
        <p class="support-info">
          Si tienes problemas, envía un correo a
          <a href="mailto:plataforma_ite@ite.edu.mx">plataforma_ite@ite.edu.mx</a>
        </p>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: "LoginAsesorView",
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
    justify-content: left; /* Logo alineado a la izquierda */
    align-items: center;
    padding-left: 20px; /* Espaciado a la izquierda */
    height: 100px;
    z-index: 10;
  }
  
  .logo {
    max-height: 80px;
    height: auto;
  }
  
  /* Sección de inicio de sesión */
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
    margin-bottom: 20px;

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
  
  /* Sección de registro */
  .register-section {
    margin: 40px auto;
    text-align: center;
  }
  
  .register-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .register-instructions {
    font-size: 1rem;
    margin-bottom: 20px;
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
  
  .support-info {
    font-size: 0.9rem;
    margin-top: 20px;
  }
  .icon-container {
  display: flex;
  flex-direction: column; /* Asegura que imagen y texto estén en columna */
  align-items: center; /* Centra horizontalmente */
  justify-content: center; /* Centra verticalmente */
  text-align: center;
  margin-top: 140px; /* Ajusta el espacio debajo del header */
  margin-bottom: 10px; /* Espaciado entre la imagen y la sección */
}

.icon-container img {
  width: 100px; /* Ajusta el tamaño deseado */
  height: 100px; /* Ajusta el tamaño deseado */
}


/* Texto "Asesorado" */
.bold-text {
  font-weight: bold;
  font-size: 1.5rem; /* Ajusta el tamaño para mayor visibilidad */
  color: #0a0a0a; /* Azul marino */
  margin: 0; /* Asegúrate de eliminar cualquier margen adicional */
}

  
  </style>
  