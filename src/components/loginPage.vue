<template>
  <button><router-link to="/">Main Page</router-link></button>
  <div class="login-container">
    <h1>Login to SociMed</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">Username</label>
        <div class="input-container">
          <i class="fa fa-user"></i>
          <input type="text" id="username" v-model="username" required />
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <div class="input-container">
          <i class="fa fa-lock"></i>
          <input type="password" id="password" v-model="password" required />
        </div>
      </div>
      <button type="submit" class="primary-button">Login</button>
    </form>
    <div class="register-link-container">
      <p class="register-link">
        Don't have an account?
        <router-link to="/register">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "LoginPage",
  setup() {
    const router = useRouter();
    return {
      router,
      username: "",
      password: "",
    };
  },
  methods: {
    handleSubmit() {
      console.log("Username:", this.username);
      console.log("Password:", this.password);
    },
  },
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css");

.login-container {
  max-width: 600px;
  max-height: 800px;
  margin: 0 auto;
  padding: 1.5em;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  font-family: "Arial", sans-serif;
}

h1 {
  text-align: center;
  color: #4a00e0;
  margin-bottom: 1em;
  font-size: 1.6em;
}

.form-group {
  margin-bottom: 1em;
}

label {
  display: block;
  margin-bottom: 0.5em;
  color: #4a00e0;
}

.input-container {
  position: relative;
}

.input-container i {
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

.primary-button {
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

.primary-button:hover {
  background-color: #3700b3;
}

.register-link-container {
  color: #4a00e0;
  text-align: center;
  margin-top: 1em;
}

.register-link a {
  color: #4a00e0;
  text-decoration: none;
  transition: text-decoration 0.3s;
}

.register-link a:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .login-container {
    width: 90%;
    padding: 1.2em;
  }
}
</style>
