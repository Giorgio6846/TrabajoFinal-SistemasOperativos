import { createWebHistory, createRouter } from "vue-router";
import axios from "axios"

import mainPage from "./components/mainPage.vue";
import loginPage from "./components/loginPage.vue";
import registerPage from "./components/registerPage.vue";

const routes = [
  { path: "/", component: mainPage },
  { path: "/login", component: loginPage },
  { path: "/register", component: registerPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
