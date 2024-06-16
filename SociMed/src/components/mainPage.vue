<template>
  <div class="mainPage">
    <div class="firstColumn">
      <img
        class="logoSociMed"
        src="../assets/sociMedIMG.png"
        alt="Image of the company SociMed"
      />
      <h3>Inicio</h3>
      <h3>Buscar</h3>
      <h3>Perfil</h3>
    </div>
    <div class="secondColumn">
      <div class="search">
        <input type="text" placeholder="¡¿Qué está pasando?!" />
      </div>
      <div class="publicacion"></div>
    </div>
    <div class="thirdColumn">
      <div class="loginRegister">
        <button><router-link to="/">Login</router-link></button>
        <button><router-link to="/register">Register</router-link></button>
      </div>
      <div>
        <h2>Tendencias</h2>
        <div class="tendencias"></div>
      </div>
    </div>
  </div>
</template>

<script>
import "../styles/mainPage.css";

export default {
  data() {
    return {
      postInfo: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch("https://api.example.com/data");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        this.postInfo = await response.json();
      } catch (error) {
        console.error("Hubo un problema con la solicitud Fetch:", error);
      }
    },
  },
  name: "mainPage",
};
</script>

<style></style>
