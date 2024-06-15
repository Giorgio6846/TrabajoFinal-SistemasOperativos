import { createWebHistory, createRouter } from "vue-router";

import mainPage from "./components/mainPage.vue";
import loginPage from "./components/loginPage.vue";

const routes = [
  { path: "/", component: mainPage },
  { path: "/login", component: loginPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
