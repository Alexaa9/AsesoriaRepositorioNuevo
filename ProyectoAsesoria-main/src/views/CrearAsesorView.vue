<template>
    <div>
      <!-- Header -->
      <header class="header">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
      </header>
  
      <!-- Título principal -->
      <div class="icon-container">
        <p class="bold-text">Crear cuenta nueva de Asesor</p>
      </div>
  
      <!-- Sección de numero de empleado -->
      <div class="input-group">
        <label class="form-label">Numero empleado:</label>
        <input type="text" class="form-input" placeholder="Escribe tu numero de empleado" />
      </div>
  
      <!-- Sección de correo -->
      <div class="input-group">
        <label class="form-label">Correo:</label>
        <input type="text" class="form-input" placeholder="Escribe tu correo" />
      </div>
  
      <!-- Sección de contraseña -->
      <div class="input-group">
        <label class="form-label">Contraseña:</label>
        <input type="password" class="form-input" placeholder="Escribe tu contraseña" />
      </div>
  
      <!-- Sección de confirmar contraseña -->
      <div class="input-group">
        <label class="form-label">Confirmar contraseña:</label>
        <input type="password" class="form-input" placeholder="Confirma tu contraseña" />
      </div>
  
      <!-- Botón Crear Cuenta -->
      
        <button class="crear-cuenta-button">Crear cuenta</button>
      
    </div>
  </template>
  <script>
  export default {
    name: "CrearAsesorView",
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
  