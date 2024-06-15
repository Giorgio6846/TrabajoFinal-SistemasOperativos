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
  name: "mainPage",
};
</script>

<style></style>
