<template>
  <div class="mainPage">
    <div class="firstColumn">
      <ul>
        <li>
          <img
            class="logoSociMed"
            src="../assets/sociMedIMG.png"
            alt="Image of the company SociMed"
          />
        </li>
        <li>Inicio</li>
        <li>Buscar</li>
        <li>Perfil</li>
      </ul>
    </div>
    <div class="secondColumn">
      <div class="search">
        <input type="text" placeholder="¡¿Qué está pasando?!" />
      </div>
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
