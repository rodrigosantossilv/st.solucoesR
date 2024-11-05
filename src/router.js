import { createRouter, createWebHistory } from 'vue-router';
//import Telaum from './components/Telaum.vue';
import LoginPage from './components/LoginPage.vue';
import RegisterPage from './components/RegisterPage.vue';
import Sidebar from './components/Sidebar.vue';
import OpenTicketPage from './components/OpenTicketPage.vue';
import kaban from './components/kaban.vue';
import HomePage from './components/HomePage.vue';

const routes = [
  //  { path: '/', component: Telaum },
  { path: '/', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/sidebar', component: Sidebar },
  { path: '/openticketpage', component: OpenTicketPage},
  { path: '/kaban', component: kaban},
  { path: '/home', component: HomePage}

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
