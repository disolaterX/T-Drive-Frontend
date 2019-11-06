import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import store from "@/store.js";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/t",
      name: "t",
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/AddNewUser.vue")
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/profile",
      name: "Profile",
      meta: {
        authRequired: true
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/Profile.vue")
    },
    {
      path: "/auth",
      name: "Auth",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/Auth.vue")
    },
    {
      path: "/verifyofc",
      name: "VerifyOfc",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/VerifyOfc.vue")
    },
    {
      path: "/verifydri",
      name: "VerifyDri",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/VerifyDri.vue")
    },
    {
      path: "/batteryreg",
      name: "Battery Registration",
      component: () => import("@/views/BatteryForm.vue")
    },
    {
      path: "/vehiclereg",
      name: "Vehicle Registration",
      component: () => import("@/views/VehicleForm.vue")
    },
    {
      path: "/franchisee",
      name: "Franchisee",
      component: () => import("@/views/Franchisee.vue")
    },
    {
      path: "/franchiseedetails",
      name: "Franchisee Detail",
      component: () => import("@/views/Franchiseedetail.vue")
    },
    {
      path: "/alluser",
      name: "All User",
      component: () => import("@/views/AllUser.vue")
    },
    {
      path: "/allsales",
      name: "All Sales",
      component: () => import("@/views/AllSales.vue")
    },
    {
      path: "/addnew",
      name: "Add New User",
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/AddNewUser.vue")
    },
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.state.isAuth) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
