import Vue from 'vue';
import VueRouter from 'vue-router';
import MyHome from '../components/MyHome';
import MyAdspect from '../components/MyAdspect';
import MyVoluumn from '../components/Voluumn/MyVoluumn.vue';
import VoluumnError from '../components/Voluumn/VoluumnError.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'MyHome',
    component: MyHome,
  },
  {
    path: '/reports',
    name: 'MyAdspect',
    component: MyAdspect,
  },
  {
    path: '/voluumn',
    name: 'MyVoluumn',
    component: MyVoluumn,
  },
  {
    path: '/voluumn-error',
    name: 'VoluumnError',
    component: VoluumnError,
  },
];

const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'router-link-active',
  routes,
});

export default router;
