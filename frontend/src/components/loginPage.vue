<template>
  <button><router-link to="/mainPage">Main Page</router-link></button>
  <div class="contenedor-login">
    <h1>Iniciar sesión en SociMed</h1>
    <form @submit.prevent="handleSubmit">
      <div class="grupo-formulario">
        <label for="email">Email</label>
        <!-- Changed from username to email -->
        <div class="contenedor-entrada">
          <i class="fa fa-envelope"></i>
          <input type="email" id="email" v-model="email" required />
          <!-- Changed from username to email -->
        </div>
      </div>
      <div class="grupo-formulario">
        <label for="password">Contraseña</label>
        <div class="contenedor-entrada">
          <i class="fa fa-lock"></i>
          <input type="password" id="password" v-model="password" required />
        </div>
      </div>
      <button type="submit" class="boton-primario">Iniciar sesión</button>
    </form>
    <div class="contenedor-enlace-registro">
      <p class="enlace-registro">
        ¿No tienes una cuenta?
        <router-link to="/register">Regístrate aquí</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "LoginPage",
  setup() {
    const router = useRouter();
    return {
      router,
      email: "",
      password: "",
    };
  },

  methods: {
    async handleSubmit() {
      console.log("Email:", this.email);
      console.log("Password", this.password);
      try {
        const response = await axios.post(
          "http://localhost:8080/authenticate",
          {
            email: this.email,
            password: this.password,
          }
        );
        console.log("Response:", response.data);
        this.router.push("/mainPage");
      } catch (error) {
        console.error("There was an error!", error);
      }
    },
  },
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css");

.contenedor-login {
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
  margin-bottom: 0.6em;
  margin-top: 0.3em;
  font-size: 1.6em;
}

.grupo-formulario {
  margin-bottom: 1em;
}

label {
  display: block;
  margin-bottom: 0.5em;
  color: #4a00e0;
}

.contenedor-entrada {
  position: relative;
}

.contenedor-entrada i {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #aaa;
}

input {
  width: calc(100% - 2.5em);
  padding: 0.6em 0.6em 0.6em 2.5em;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #4a00e0;
  outline: none;
}

.boton-primario {
  width: 100%;
  padding: 0.8em;
  background-color: #4a00e0;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
}

.boton-primario:hover {
  background-color: #3700b3;
}

.contenedor-enlace-registro {
  color: #4a00e0;
  text-align: center;
  margin-top: 1em;
}

.enlace-registro a {
  color: #4a00e0;
  text-decoration: none;
  transition: text-decoration 0.3s;
}

.enlace-registro a:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .contenedor-login {
    width: 90%;
    padding: 1.2em;
  }
}
</style>
