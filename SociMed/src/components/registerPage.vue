<template>
  <button><router-link to="/">login Page</router-link></button>
  <div class="register-container">
    <h1>Register</h1>
    <form @submit="handleSubmit">
      <div class="form-group">
        <label for="username">Username</label>
        <div class="input-container">
          <i class="fa fa-user"></i>
          <input type="text" id="username" v-model="username" required />
        </div>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <div class="input-container">
          <i class="fa fa-envelope"></i>
          <input type="email" id="email" v-model="email" required />
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <div class="input-container">
          <i class="fa fa-lock"></i>
          <input type="password" id="password" v-model="password" required />
        </div>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <div class="input-container">
          <i class="fa fa-lock"></i>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            required
          />
        </div>
      </div>
      <button type="submit" class="primary-button">Register</button>
    </form>
    <div class="register-link-container">
      <p class="register-link">
        Already have an account?
        <router-link to="/">Login here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "RegisterPage",
  setup() {
    const router = useRouter();
    return {
      router,
      userData: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      sendData();
      console.log("Username:", this.username);
      console.log("Email:", this.email);
      console.log("Password:", this.password);
      console.log("Confirm Password:", this.confirmPassword);
    },
    async sendData() {
      try {
        const response = await axios.post(
          "https://api.example.com/user",
          this.userData
        );
        console.log("Response from server:", response.data);
      } catch (error) {
        console.error("Hubo un problema con la solicitud Axios:", error);
      }
    },
  },
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css");

.register-container {
  max-width: 600px;
  max-height: 910px;
  margin: 0 auto;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  font-family: "Arial", sans-serif;
}

h1 {
  text-align: center;
  color: #4a00e0;
  margin-bottom: 0.8em;
  font-size: 1.4em;
}

.form-group {
  margin-bottom: 0.8em;
}

label {
  display: block;
  margin-bottom: 0.4em;
  color: #4a00e0;
  font-size: 0.9em;
}

.input-container {
  position: relative;
}

.input-container i {
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

.primary-button {
  width: 100%;
  padding: 0.6em;
  background-color: #4a00e0;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9em;
  cursor: pointer;
  transition: background-color 0.3s;
}

.primary-button:hover {
  background-color: #3700b3;
}

.register-link-container {
  color: #4a00e0;
  text-align: center;
  margin-top: 0.8em;
  font-size: 0.9em;
}

.register-link a {
  color: #4a00e0;
  text-decoration: none;
  transition: text-decoration 0.3s;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
