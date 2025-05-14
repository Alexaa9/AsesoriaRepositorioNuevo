<template>
    <div>
      <!-- Header -->
      <header class="header">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
      </header>
  
      <div class="icon-container">
  <img src="@/assets/asesorado.png" alt="asesorado">
  <p class="bold-text">Administrador</p>
  </div>
      <!-- Título principal -->
      <div class="session-title">
        <p class="bold-text">Iniciar Sesion</p>
      </div>
  
      <!-- Sección de matrícula -->
      <div class="input-group">
        <label class="form-label">Correo:</label>
        <input type="text" class="form-input" placeholder="Escribe tu correo" />
      </div>
  
      <!-- Sección de correo -->
      <div class="input-group">
        <label class="form-label">Contraseña:</label>
        <input type="text" class="form-input" placeholder="Escribe tu contraseña" />
      </div>
  
    
      <router-link to="/menu-Admin" class="crear-cuenta-button">Acceder</router-link>
  


    </div>
  </template>
  
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
  z-index: 100; /* Asegura que el header esté sobre otros elementos */
}
  
  .logo {
    max-height: 80px;
    height: auto;
  }
  
  /* Título principal */
  
  
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
  .icon-container {
  display: flex;
  flex-direction: column; /* Mantiene imagen y texto en columna */
  align-items: center; /* Centra horizontalmente */
  text-align: center;
  margin-top: 50px; /* Reduce la separación del icono con "Iniciar Sesión" */
  margin-bottom: 5px; /* Espaciado más compacto */
}

.icon-container img {
  width: 90px; /* Tamaño más ajustado */
  height: 90px;
  margin-bottom: 3px; /* Reduce el espacio entre el icono y el texto */
}
.session-title {
  margin-top: 30px; /* Aumenta la separación entre "Administrador" e "Iniciar Sesión" */
}


  </style>
  