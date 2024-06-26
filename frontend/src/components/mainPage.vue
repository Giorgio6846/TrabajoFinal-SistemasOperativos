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
      <div class="publicacion">
        <input type="file" id="fileInput" @change="handleFileInput" />
        <input
          v-model="post.description"
          placeholder="Enter your description"
        />
        <button @click="createPost">Create Post</button>
      </div>
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
import axios from "axios";

import "../styles/mainPage.css";

export default {
  data() {
    return {
      postInfo: null,
      selectedFile: null,
      post: {
        description: "",
      },
    };
  },
  mounted() {},
  methods: {
    handleFileInput(event) {
      this.selectedFile = event.target.files[0];
    },
    async createPost() {
      if (!this.selectedFile) {
        console.error("Please select a file first");
        return;
      }
      try {
        const token = localStorage.getItem("authToken");
        const formData = new FormData();
        formData.append("description", this.post.description);
        formData.append("photo", this.selectedFile);

        const response = await axios.post(
          "http://localhost:8080/api/posts",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.postInfo = response.data;
        console.log("Post created successfully:", this.postInfo);
      } catch (error) {
        console.error("Error creating post:", error);
      }
    },
  },
  name: "mainPage",
};
</script>

<style></style>
