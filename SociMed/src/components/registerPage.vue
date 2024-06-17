<template>
  <button><router-link to="/">Iniciar Sesión</router-link></button>
  <div class="registro">
    <h1>Registro</h1>
    <form @submit.prevent="manejarRegistro">
      <div class="grupo">
        <label for="usuario">Usuario</label>
        <div class="entrada">
          <i class="fa fa-user"></i>
          <input type="text" id="usuario" v-model="datosUsuario.usuario" required />
        </div>
      </div>
      <div class="grupo">
        <label for="correo">Correo</label>
        <div class="entrada">
          <i class="fa fa-envelope"></i>
          <input type="email" id="correo" v-model="datosUsuario.correo" required />
        </div>
      </div>
      <div class="grupo">
        <label for="contrasena">Contraseña</label>
        <div class="entrada">
          <i class="fa fa-lock"></i>
          <input type="password" id="contrasena" v-model="datosUsuario.contrasena" required />
        </div>
      </div>
      <div class="grupo">
        <label for="confirmarContrasena">Confirmar</label>
        <div class="entrada">
          <i class="fa fa-lock"></i>
          <input type="password" id="confirmarContrasena" v-model="confirmarContrasena" required />
        </div>
        <p v-if="contrasenasDistintas" class="error">Las contraseñas no coinciden</p>
      </div>
      <button type="submit" class="boton" :disabled="contrasenasDistintas">Registrarse</button>
    </form>
    <div class="inicio">
      <p class="enlace">
        ¿Cuenta existente?
        <router-link to="/">Iniciar sesión</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "PaginaDeRegistro",
  setup() {
    const router = useRouter();
    return {
      router,
      datosUsuario: {
        usuario: "",
        correo: "",
        contrasena: "",
      },
      confirmarContrasena: "",
    };
  },
  computed: {
    contrasenasDistintas() {
      return this.datosUsuario.contrasena !== this.confirmarContrasena;
    },
  },
  methods: {
    manejarRegistro() {
      if (!this.contrasenasDistintas) {
        this.enviarDatos();
      }
    },
    async enviarDatos() {
      try {
        const respuesta = await axios.post(
          "https://api.example.com/usuario",
          this.datosUsuario
        );
        console.log("Respuesta del servidor:", respuesta.data);
      } catch (error) {
        console.error("Hubo un problema con la solicitud Axios:", error);
      }
    },
  },
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css");

.registro {
  max-width: 500px;
  max-height: 800px;
  margin: 0 auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  font-family: "Arial", sans-serif;
}

h1 {
  text-align: center;
  color: #4a00e0;
  margin-top: auto;
  margin-bottom: 0.4em;
  font-size: 1.4em;
}

.grupo {
  margin-bottom: 0.8em;
}

label {
  display: block;
  margin-bottom: 0.2em;
  color: #4a00e0;
  font-size: 0.9em;
}

.entrada {
  position: relative;
}

.entrada i {
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
  color: #aaa;
  font-size: 0.9em;
}

input {
  width: calc(100% - 2em);
  padding: 0.5em 0.5em 0.5em 2em;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9em;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #4a00e0;
  outline: none;
}

.error {
  color: red;
  font-size: 0.8em;
  margin-top: 0.4em;
}

.boton {
  width: 100%;
  padding: 0.2em;
  background-color: #4a00e0;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 0.9em;
  cursor: pointer;
  transition: background-color 0.3s;
}

.boton:hover {
  background-color: #3700b3;
}

.boton:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.inicio {
  color: #4a00e0;
  text-align: center;
  margin-top: 0.8em;
  font-size: 0.9em;
}

.enlace a {
  color: #4a00e0;
  text-decoration: none;
  transition: text-decoration 0.3s;
}

.enlace a:hover {
  text-decoration: underline;
}

@media (max-width: 500px) {
  .registro {
    width: 90%;
    padding: 0.8em;
  }
}
</style>