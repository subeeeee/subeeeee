import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(VueRouter);
import loading from './../utils/loading'
const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  Nprogress.start()
  loading.open()
  setTimeout(() => {
    next()
  }, 300)

})
router.afterEach((to, from) => {
  Nprogress.done()
  loading.close()
})



export default router;
