<template>
  <div>
    <ul>
      <li>
        <img
          src="../assets/sociMedIMG.png"
          alt="Image of the company SociMed"
        />
      </li>
      <li>Inicio</li>
      <li>Buscar</li>
      <li>Perfil</li>
    </ul>
  </div>
  <div>
    <div class="search">
      <input type="text" placeholder="¡¿Qué está pasando?!" />
    </div>
  </div>
  <div>
    <div>
      <h2>Tendencias</h2>
      <div class="tendencias"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mainPage",
};
</script>

<style scoped>
li {
  list-style-type: none;
}
</style>
