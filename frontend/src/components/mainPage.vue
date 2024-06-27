<template>
  <div class="mainPage">
    <div class="firstColumn">
      <img
        class="logoSociMed"
        src="../assets/sociMedIMG.png"
        alt="Image of the company SociMed"
      />
      <h3>Inicio</h3>
    </div>
    <div class="secondColumn">
      <div class="search">
        <input
          type="text"
          placeholder="¡Publica como te sientes!"
          v-model="post.description"
        />
        <button @click="createPost">Create Post</button>
      </div>

      <div class="postContainer">
        <div v-for="post in postFinal" :key="post.postId" class="post">
          <div class="post-header">
            <h3 class="post-author">{{ post.author }} dice:</h3>
          </div>
          <div class="post-content">
            <p class="post-description">{{ post.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="thirdColumn">
      <div class="loginRegister">
        <button><router-link to="/">Login</router-link></button>
        <button><router-link to="/register">Register</router-link></button>
      </div>
      <div>
        <h2>Ingresa a la pagina!</h2>
        <div class="tendencias"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import myImage from "../assets/capybara.jpg";

import "../styles/mainPage.css";

export default {
  data() {
    return {
      postInfo: null,
      IdPost: null,
      post: {
        description: "",
      },
      postFinal: null,
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async createPost() {
      try {
        const token = localStorage.getItem("authToken");
        const formData = new FormData();
        formData.append("description", this.post.description);

        const response = await axios.post(
          "http://10.147.17.152:8080/api/posts",
          this.post,
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
      this.getPosts();
    },
    async getPosts() {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://10.147.17.152:8080/api/posts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Posts:", response.data);
        this.IdPost = response.data.posts;
        console.log("Number of post IDs:", this.IdPost.length);

        if (this.IdPost.length > 0) {
          const postPromises = this.IdPost.map((postId) =>
            axios.post(
              "http://10.147.17.152:8080/api/post",
              { postId: postId },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
          );

          const postResponses = await Promise.all(postPromises);

          this.postFinal = postResponses.map((response) => response.data);

          console.log("All post details:", this.postFinal);
          console.log("Number of posts retrieved:", this.postFinal.length);
        } else {
          console.log("No posts found");
          this.postFinal = [];
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        this.postFinal = [];
      }
    },
  },
  name: "mainPage",
};
</script>

<style>
.search {
  display: flex;
  align-items: center;
  padding: 10px;
}

.search input {
  flex-grow: 1;
  margin-right: 10px;
}

.create-post-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.postContainer {
  padding: 20px;
  overflow-y: auto;
}

.post {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  overflow: hidden;
}

.post-header {
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: #f0f2f5;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #1877f2;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 10px;
}

.post-author {
  font-size: 16px;
  font-weight: 600;
  color: #050505;
  margin: 0;
}

.post-content {
  padding: 12px;
}

.post-description {
  font-size: 14px;
  line-height: 1.5;
  color: #050505;
  margin: 0;
}

.post-footer {
  display: flex;
  justify-content: space-around;
  padding: 8px;
  border-top: 1px solid #e4e6eb;
}

.post-action {
  background: none;
  border: none;
  color: #65676b;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.post-action:hover {
  background-color: #f0f2f5;
}
</style>
